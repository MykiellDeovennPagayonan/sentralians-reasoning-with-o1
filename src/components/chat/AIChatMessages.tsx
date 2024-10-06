import { ScrollArea } from "../ui/scroll-area"
import { GPT4oMessagesInput, O1MessagesInput } from "@/lib/types"

interface AIChatMessagesProps {
  messages: GPT4oMessagesInput[] | O1MessagesInput[]
}

export default function AIChatMessages({messages} : AIChatMessagesProps) {

  return (
    <ScrollArea className="flex-grow w-full p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-md py-2 px-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted border-2 border-gray-300'
            }`}
          >
            {message.content ? (
              Array.isArray(message.content) ? (
                message.content.map((content, index) => (
                  <div key={index}>
                    {typeof content === 'string'
                      ? content
                      : 'text' in content
                      ? content.text
                      : JSON.stringify(content)}
                  </div>
                ))
              ) : (
                <div>{message.content}</div>
              )
            ) : (
              <div />
            )}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}