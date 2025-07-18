import { NextRequest, NextResponse } from "next/server";
import { getFlashcardPrompt } from "../../../utils/promptTemplates";
import { callLLM, type Provider } from "../../../utils/llmClient";

// Define Message type to match llmClient
type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface RequestBody {
  content: string;
  provider?: Provider;
  model?: string;
  openaiKey?: string;
  geminiKey?: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      content,
      provider = "openai",
      model,
      openaiKey,
      geminiKey,
    }: RequestBody = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Set default model based on provider
    const selectedModel =
      model || (provider === "openai" ? "gpt-4o-mini" : "gemini-2.0-flash");

    // Get API keys from environment or request
    const creds = {
      openaiKey: openaiKey || process.env.OPENAI_API_KEY,
      geminiKey: geminiKey || process.env.GEMINI_API_KEY,
    };

    // Validate required API key based on provider
    if (provider === "openai" && !creds.openaiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not provided" },
        { status: 400 }
      );
    }

    if (provider === "gemini" && !creds.geminiKey) {
      return NextResponse.json(
        { error: "Gemini API key not provided" },
        { status: 400 }
      );
    }

    // Prepare the flashcard generation prompt
    const flashcardPrompt = getFlashcardPrompt(content);
    const messages: Message[] = [
      { role: "system", content: flashcardPrompt },
      {
        role: "user",
        content: "Please generate flashcards from this content.",
      },
    ];

    // Call LLM to generate flashcards
    const aiResponse = await callLLM(provider, selectedModel, messages, creds, {
      maxRetries: 3,
      maxTokens: provider === "openai" ? 1500 : 2000,
    });

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Parse the response to extract Q&A pairs
    const flashcards = parseFlashcardsFromResponse(aiResponse);

    return NextResponse.json({
      flashcards,
      provider,
      model: selectedModel,
    });
  } catch (error) {
    console.error("Generate flashcards API error:", error);

    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Invalid or missing API key" },
          { status: 401 }
        );
      }
      if (error.message.includes("rate_limit")) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      if (error.message.includes("insufficient_quota")) {
        return NextResponse.json(
          { error: "API quota exceeded. Please check your account." },
          { status: 402 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Parse Q&A pairs from AI response
 */
function parseFlashcardsFromResponse(
  response: string
): Array<{ question: string; answer: string }> {
  const flashcards: Array<{ question: string; answer: string }> = [];

  // Look for Q: ... A: ... patterns
  const qaPattern = /Q:\s*(.+?)\s*A:\s*(.+?)(?=\n\s*Q:|$)/gs;
  let match;

  while ((match = qaPattern.exec(response)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question && answer) {
      flashcards.push({ question, answer });
    }
  }

  // Look for numbered question patterns if no Q: A: pattern found
  if (flashcards.length === 0) {
    const numberedPattern = /(\d+\.\s*.+?\?)\s*(.+?)(?=\n\s*\d+\.|$)/gs;
    while ((match = numberedPattern.exec(response)) !== null) {
      const question = match[1].trim();
      const answer = match[2].trim();
      if (question && answer && question.includes("?")) {
        flashcards.push({ question, answer });
      }
    }
  }

  return flashcards;
}
