/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatCompletionTool } from "openai/resources/index.mjs";
import createQuiz from "./function-calling-tools/createQuiz";
import createPptSlides from "./function-calling-tools/createPptSlides";
import createFlashcards from "./function-calling-tools/createFlashcards";
import createSpellingQuiz from "./function-calling-tools/createSpellingQuiz";

const functionCallingTools: ChatCompletionTool[] = [
  createQuiz,
  createPptSlides,
  createFlashcards,
  createSpellingQuiz
]

export default functionCallingTools;