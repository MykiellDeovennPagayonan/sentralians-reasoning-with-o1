import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import * as dotenv from 'dotenv';
import functionCallingTools from "./functionCallingTools";
import { AIResponse } from "@/lib/types";

dotenv.config();

const apiKey = process.env.AIML_API_KEY;

const baseURL = "https://api.aimlapi.com/v1";

const openai = new OpenAI({
  apiKey,
  baseURL,
});

export default async function getGPT4oResponse(messages : ChatCompletionMessageParam[]) : Promise<AIResponse> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    temperature: 1,
    max_tokens: 15010,
    tools: functionCallingTools,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  if (response.choices[0].message.tool_calls && response.choices[0].message.tool_calls[0].function.name === "create_quiz") {
    const quiz = response.choices[0].message.tool_calls[0].function.arguments
    return {content: quiz, contentType: "quiz"};
  }


  if (response.choices[0].message.tool_calls && response.choices[0].message.tool_calls[0].function.name === "create_ppt_slides") {
    const ppt = response.choices[0].message.tool_calls[0].function.arguments
    return {content: ppt, contentType: "ppt"};
  }

  if (response.choices[0].message.tool_calls && response.choices[0].message.tool_calls[0].function.name === "create_flashcards") {
    const ppt = response.choices[0].message.tool_calls[0].function.arguments
    return {content: ppt, contentType: "flashcards"};
  }

  return {content: response.choices[0].message.content as string};
}

