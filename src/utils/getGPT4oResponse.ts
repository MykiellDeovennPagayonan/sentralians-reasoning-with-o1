import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function getGPT4oResponse(messages : ChatCompletionMessageParam[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 1,
    max_tokens: 4010,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_object",
    },
  })

  return response
}

