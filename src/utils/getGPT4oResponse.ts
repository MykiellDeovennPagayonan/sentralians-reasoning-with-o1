import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import * as dotenv from 'dotenv';
import functionCallingTools from "./functionCallingTools";
import { AIResponse } from "@/lib/types";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

export default async function getGPT4oResponse(messages : ChatCompletionMessageParam[]) : Promise<AIResponse> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 1,
    max_tokens: 12010,
    tools: functionCallingTools,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  if (response.choices[0].message.tool_calls && response.choices[0].message.tool_calls[0].function.name === "create_quiz") {
    const quiz = response.choices[0].message.tool_calls[0].function.arguments
    return {content: quiz, contentType: "quiz"};
  }

  return {content: response.choices[0].message.content as string};
}

