import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

type Choice = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  questionText: string;
  choices: Choice[];
};

export type GPT4oMessagesInput = ChatCompletionMessageParam & {
  componentMessageType?: "quiz" | "ppt" | "flashcards" | "spelling";
};

export type AIResponse = {
  content: string;
  contentType?: "quiz" | "ppt" | "flashcards" | "spelling"; 
}

export type O1MessagesInput = {
  role: "system" | "user" | "assistant";
  content: string;
  componentMessageType?: "quiz";
}