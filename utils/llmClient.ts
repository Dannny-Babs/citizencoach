// utils/llmClient.ts

export type Provider = "openai" | "gemini";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type Creds = {
  openaiKey?: string;
  geminiKey?: string;
};

type LLMOptions = {
  stream?: boolean;
  maxRetries?: number;
  maxTokens?: number;
  onStream?: (chunk: string) => void;
};

type LLMError = {
  code: string;
  message: string;
  type: string;
  statusCode: number;
};

// Token/character limits for chunking
const MAX_TOKENS = {
  openai: 16000, // Conservative estimate for most models
  gemini: 30000, // Gemini Pro limit
};

/**
 * Estimate token count (rough approximation: 1 token ≈ 4 characters)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Chunk messages if they exceed token limits
 */
function chunkMessages(messages: Message[], maxTokens: number): Message[] {
  const totalTokens = messages.reduce(
    (sum, msg) => sum + estimateTokens(msg.content),
    0
  );

  if (totalTokens <= maxTokens) return messages;

  // Keep system message and recent messages, summarize older ones
  const systemMessages = messages.filter((m) => m.role === "system");
  const nonSystemMessages = messages.filter((m) => m.role !== "system");

  // Keep last few messages that fit within limit
  let currentTokens = systemMessages.reduce(
    (sum, msg) => sum + estimateTokens(msg.content),
    0
  );
  const recentMessages: Message[] = [];

  for (let i = nonSystemMessages.length - 1; i >= 0; i--) {
    const msgTokens = estimateTokens(nonSystemMessages[i].content);
    if (currentTokens + msgTokens > maxTokens * 0.8) break; // Leave 20% buffer

    recentMessages.unshift(nonSystemMessages[i]);
    currentTokens += msgTokens;
  }

  // Add summary of older messages if needed
  const olderMessages = nonSystemMessages.slice(
    0,
    nonSystemMessages.length - recentMessages.length
  );
  if (olderMessages.length > 0) {
    const summary = {
      role: "system" as const,
      content: `[Previous conversation summary: ${olderMessages.length} messages exchanged covering various topics]`,
    };
    return [...systemMessages, summary, ...recentMessages];
  }

  return [...systemMessages, ...recentMessages];
}

/**
 * Parse structured error from API response
 */
async function parseApiError(response: Response): Promise<LLMError> {
  let errorData: {
    error?: { code?: string; message?: string; type?: string };
    code?: string;
    message?: string;
    type?: string;
  } = { message: response.statusText };

  try {
    errorData = await response.json();
  } catch {
    // Fallback if JSON parsing fails
  }

  return {
    code: errorData.error?.code || errorData.code || "unknown",
    message:
      errorData.error?.message || errorData.message || response.statusText,
    type: errorData.error?.type || errorData.type || "api_error",
    statusCode: response.status,
  };
}

/**
 * Retry wrapper with exponential backoff
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (
        error instanceof Error &&
        (error.message.includes("invalid_api_key") ||
          error.message.includes("insufficient_quota") ||
          error.message.includes("model_not_found"))
      ) {
        throw error;
      }

      if (attempt === maxRetries) break;

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Handle streaming responses
 */
async function handleStreamingResponse(
  response: Response,
  provider: Provider,
  onStream?: (chunk: string) => void
): Promise<string> {
  if (!response.body) {
    throw new Error("No response body for streaming");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullContent = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            let content = "";

            if (provider === "openai") {
              content = parsed.choices?.[0]?.delta?.content || "";
            } else if (provider === "gemini") {
              content =
                parsed.candidates?.[0]?.content?.parts?.[0]?.text ||
                parsed.candidates?.[0]?.delta?.parts?.[0]?.text ||
                "";
            }

            if (content) {
              fullContent += content;
              onStream?.(content);
            }
          } catch {
            // Skip invalid JSON chunks
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullContent;
}

/**
 * Call OpenAI API with retry and error handling
 */
async function callOpenAI(
  model: string,
  messages: Message[],
  apiKey: string,
  options: LLMOptions
): Promise<string | null> {
  const { stream = false, onStream } = options;
  const chunkedMessages = chunkMessages(messages, MAX_TOKENS.openai);

  return withRetry(async () => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: chunkedMessages,
        stream,
      }),
    });

    if (!response.ok) {
      const error = await parseApiError(response);
      throw new Error(`OpenAI API error (${error.code}): ${error.message}`);
    }

    if (stream && onStream) {
      return await handleStreamingResponse(response, "openai", onStream);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  }, options.maxRetries);
}

/**
 * Call Gemini API with retry and error handling
 */
async function callGemini(
  model: string,
  messages: Message[],
  apiKey: string,
  options: LLMOptions
): Promise<string | null> {
  const { stream = false, onStream } = options;
  const chunkedMessages = chunkMessages(messages, MAX_TOKENS.gemini);

  return withRetry(async () => {
    const endpoint = stream ? "streamGenerateContent" : "generateContent";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${endpoint}?key=${apiKey}`;

    // Convert messages to Gemini format
    const geminiContents = [];
    let systemInstruction = "";

    for (const message of chunkedMessages) {
      if (message.role === "system") {
        // Gemini handles system messages as systemInstruction
        systemInstruction = message.content;
      } else if (message.role === "user") {
        geminiContents.push({
          role: "user",
          parts: [{ text: message.content }],
        });
      } else if (message.role === "assistant") {
        geminiContents.push({
          role: "model", // Gemini uses "model" instead of "assistant"
          parts: [{ text: message.content }],
        });
      }
    }

    const requestBody: any = {
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: options.maxTokens || 2048,
      },
    };

    // Add system instruction if present
    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }],
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await parseApiError(response);
      throw new Error(`Gemini API error (${error.code}): ${error.message}`);
    }

    if (stream && onStream) {
      return await handleStreamingResponse(response, "gemini", onStream);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }, options.maxRetries);
}

export async function callLLM(
  provider: Provider,
  model: string,
  messages: Message[],
  creds: Creds,
  options: LLMOptions = {}
): Promise<string | null> {
  if (provider === "openai") {
    if (!creds.openaiKey) throw new Error("OpenAI key missing");
    return await callOpenAI(model, messages, creds.openaiKey, options);
  }

  if (provider === "gemini") {
    if (!creds.geminiKey) throw new Error("Gemini key missing");
    return await callGemini(model, messages, creds.geminiKey, options);
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

/**
 * Convenience function for streaming responses
 */
export async function callLLMStreaming(
  provider: Provider,
  model: string,
  messages: Message[],
  creds: Creds,
  onStream: (chunk: string) => void,
  options: Omit<LLMOptions, "stream" | "onStream"> = {}
): Promise<string | null> {
  return callLLM(provider, model, messages, creds, {
    ...options,
    stream: true,
    onStream,
  });
}
