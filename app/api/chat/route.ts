import { NextRequest, NextResponse } from "next/server";
import { getCitizenshipPrompt } from "../../../utils/promptTemplates";
import { callLLM, type Provider } from "../../../utils/llmClient";

// Define Message type to match llmClient
type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface RequestBody {
  messages: Message[];
  provider?: Provider;
  model?: string;
  openaiKey?: string;
  geminiKey?: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      messages,
      provider = "openai",
      model,
      openaiKey,
      geminiKey,
    }: RequestBody = await request.json();

    // Set default model based on provider
    const selectedModel =
      model || (provider === "openai" ? "gpt-4o-mini" : "gemini-2.0-flash");

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

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

    // Prepare messages with system prompt
    const systemPrompt = getCitizenshipPrompt();
    const chatMessages: Message[] = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    // Call LLM using our enhanced client
    const aiResponse = await callLLM(
      provider,
      selectedModel,
      chatMessages,
      creds,
      {
        maxRetries: 3,
        maxTokens: provider === "openai" ? 1000 : 2000,
      }
    );

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: aiResponse,
      provider,
      model: selectedModel,
    });
  } catch (error) {
    console.error("Chat API error:", error);

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
