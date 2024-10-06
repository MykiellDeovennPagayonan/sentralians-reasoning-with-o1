import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.AIML_API_KEY;

const baseURL = "https://api.aimlapi.com/v1";

const openai = new OpenAI({
  apiKey,
  baseURL,
});

export default async function getGPT4oResponse(messages : ChatCompletionMessageParam[]) : Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 1,
    max_tokens: 12010,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  return (response.choices[0].message.content as string);
}

