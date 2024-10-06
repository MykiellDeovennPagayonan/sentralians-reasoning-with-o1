/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatCompletionTool } from "openai/resources/index.mjs";
import createQuiz from "./function-calling-tools/createQuiz";

const functionCallingTools: ChatCompletionTool[] = [
  createQuiz
]

export default functionCallingTools;