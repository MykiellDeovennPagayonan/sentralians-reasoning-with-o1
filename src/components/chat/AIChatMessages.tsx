import { ScrollArea } from "../ui/scroll-area";
import { GPT4oMessagesInput, O1MessagesInput } from "@/lib/types";
import Quiz from "./interactive-components/quiz";
import PptSlides from "./interactive-components/PptSlides";
import Flashcards from "./interactive-components/flashcards";
import ImageUploader from "./interactive-components/ImageUploader";
import DrawingCanvas from "./interactive-components/DrawingCanvas";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

interface AIChatMessagesProps {
  messages: GPT4oMessagesInput[] | O1MessagesInput[];
  setMessages: React.Dispatch<React.SetStateAction<GPT4oMessagesInput[] | O1MessagesInput[]>>;
}

export default function AIChatMessages({ messages, setMessages }: AIChatMessagesProps) {
  console.log(messages);

  return (
    <ScrollArea className="flex-grow w-full p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start space-x-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.role !== 'user' && (
            <Avatar className="bg-muted flex-shrink-0">
              <AvatarFallback>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#A0AEC0" strokeWidth="2" />
                </svg>
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={`py-2 px-4 rounded-lg mb-4 ${message.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted border-2 border-gray-300'
              }`}
          >
            {message.content ? (
              (() => {
                switch (message.componentMessageType) {
                  case 'quiz':
                    if (typeof message.content === 'string') {
                      const parsedContent = JSON.parse(message.content);
                      return <Quiz questions={parsedContent.questions} />;
                    }
                    break;
                  case 'ppt':
                    if (typeof message.content === 'string') {
                      const parsedContent = JSON.parse(message.content)
                      return <PptSlides slides={parsedContent.slides} />;
                    }
                    break;
                  case 'flashcards':
                    if (typeof message.content === 'string') {
                      const parsedContent = JSON.parse(message.content);
                      return <Flashcards flashcards={parsedContent.flashcards} />;
                    }
                    break;
                  case 'canvas':
                    return <DrawingCanvas messages={messages} setMessages={setMessages} />
                    break;
                  case 'image':
                    console.log("yes?")
                    return <ImageUploader messages={messages} setMessages={setMessages} />
                    break;
                  default:
                    return Array.isArray(message.content)
                      ? message.content.map((content, subIndex) => (
                        <div key={subIndex}>
                          {typeof content === 'string'
                            ? content
                            : 'text' in content
                              ? content.text
                              : JSON.stringify(content)}
                        </div>
                      ))
                      : <div>{message.content}</div>;
                }
              })()
            ) : (
              <div />
            )}
          </div>

          {message.role === 'user' && (
            <Avatar className="bg-muted flex-shrink-0">
              <AvatarFallback>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#4A5568" />
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" fill="#A0AEC0" />
                </svg>
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </ScrollArea>
  );
}
