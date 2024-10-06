import { NextRequest, NextResponse } from 'next/server';
import generateAIResponse from '@/utils/generateAIResponse';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { O1MessagesInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatCompletionMessageParam[] | O1MessagesInput[] = body.messages;

    console.log(messages)

    const response = await generateAIResponse(messages);

    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
  }
}