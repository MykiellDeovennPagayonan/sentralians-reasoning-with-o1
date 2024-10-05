import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export type GPT4oMessagesInput = ChatCompletionMessageParam;

export type O1MessagesInput = {
  role: "system" | "user" | "assistant";
  content: string
}