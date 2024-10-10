import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { O1MessagesInput, AIResponse } from "@/lib/types";

export default async function fetchGenerateAIResponse(messages: (ChatCompletionMessageParam | O1MessagesInput)[]): Promise<AIResponse> {
  const filteredMessages = messages.map((message) => {
    if ('messageType' in message || 'componentMessageType' in message) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      const { messageType, componentMessageType, ...rest } = message as any;
      return rest; 
    }
    return message; // Return the message as is if messageType/componentMessageType don't exist
  });
  
  try {
    const response = await fetch('/api/generate-ai-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filteredMessages }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    const data = await response.json();
    if (data.contentType) {
      return { content: data.content, contentType: data.contentType };
    }
    return { content: data.content };
  } catch (error) {
    console.error('Error calling AI response API:', error);
    throw error;
  }
}