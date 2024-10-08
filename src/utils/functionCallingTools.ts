/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatCompletionTool } from "openai/resources/index.mjs";
import createQuiz from "./function-calling-tools/createQuiz";
import createPptSlides from "./function-calling-tools/createPptSlides";

const functionCallingTools: ChatCompletionTool[] = [
  createQuiz,
  createPptSlides
]

export default functionCallingTools;