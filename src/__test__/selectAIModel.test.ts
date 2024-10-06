import selectAIModel from "@/utils/selectAIModel"; // Adjust the import path as needed
import { O1MessagesInput } from "@/lib/types";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

describe('selectAIModel', () => {
  test('returns "gpt-4o" for array of GPT4oMessagesInput with content array', () => {
    const input: ChatCompletionMessageParam[] = [{
      role: "user",
      content: [
        { type: "text", text: "Hello, AI!" },
        { type: "image_url", image_url: { url: "https://example.com/image.jpg" } }
      ]
    }];
    expect(selectAIModel(input)).toBe("gpt-4o");
  });

  test('returns "gpt-4o" for array of GPT4oMessagesInput with content object', () => {
    const input: ChatCompletionMessageParam[] = [{
      role: "user",
      content: [{ type: "text", text: "Hello, AI!" }]
    }];
    expect(selectAIModel(input)).toBe("gpt-4o");
  });

  test('returns "o1" for array of O1MessagesInput', () => {
    const input: O1MessagesInput[] = [{
      role: "user",
      content: "Hello, AI!"
    }];
    expect(selectAIModel(input)).toBe("o1");
  });

  test('handles different roles for both input types', () => {
    const gpt4oInput: ChatCompletionMessageParam[] = [{
      role: "assistant",
      content: [{ type: "text", text: "AI response" }]
    }];
    expect(selectAIModel(gpt4oInput)).toBe("gpt-4o");

    const o1Input: O1MessagesInput[] = [{
      role: "system",
      content: "System message"
    }];
    expect(selectAIModel(o1Input)).toBe("o1");
  });

  test('handles array of O1MessagesInput with empty string content', () => {
    const input: O1MessagesInput[] = [{
      role: "user",
      content: ""
    }];
    expect(selectAIModel(input)).toBe("o1");
  });

  test('throws error for empty array input', () => {
    expect(() => selectAIModel([])).toThrow("Message input array is empty");
  });
});