import { NextRequest, NextResponse } from 'next/server';
import generateAIResponse from '@/utils/generateAIResponse';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { O1MessagesInput, AIResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatCompletionMessageParam[] | O1MessagesInput[] = body.filteredMessages;

    const response = await generateAIResponse(messages);
    if (response.contentType === "quiz" || response.contentType === "ppt" || response.contentType == "flashcards") {
      return NextResponse.json({ content: response.content, contentType: response.contentType } as AIResponse, { status: 200 });
    }

    return NextResponse.json({ content: response.content } as AIResponse, { status: 200 });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
  }
}