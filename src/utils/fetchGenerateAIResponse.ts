import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { O1MessagesInput } from "@/lib/types";

export default async function fetchGenerateAIResponse(messages: (ChatCompletionMessageParam | O1MessagesInput)[]): Promise<string> {
  console.log("1")
  try {
    const response = await fetch('/api/generate-ai-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error calling AI response API:', error);
    throw error;
  }
}