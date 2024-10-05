import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import { O1MessagesInput } from "@/lib/types";

dotenv.config({ path: ".env" });

const apiKey = process.env.AIML_API_KEY;

const baseURL = "https://api.aimlapi.com/v1";

const openai = new OpenAI({
  apiKey,
  baseURL,
});

export default async function getO1Response(messages : O1MessagesInput[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
  });

  return response
}