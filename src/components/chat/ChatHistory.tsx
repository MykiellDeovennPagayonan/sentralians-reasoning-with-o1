import { Button } from "@/components/ui/button";
import { Chat } from "@prisma/client";
import { PlusCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface ChatHistoryProps {
  history: Chat[];
}

export default function ChatHistory({ history }: ChatHistoryProps) {
  const pathname = usePathname();
  console.log(pathname, 'pathname')
  return (
    <div className="h-full bg-gray-50 p-4 flex flex-col">
      <Link href={"/"} className="mb-4">
        <Button className="w-full flex items-center gap-2">
          <PlusCircle size={20} />
          New Chat
        </Button>
      </Link>

      <div className="flex-1 overflow-y-auto">
        {history.map((chat) => {
          const isActive = pathname === `/chat/${chat.chatSessionId}`;

          return (
            <Link
              key={chat.userId}
              href={`/chat/${chat.chatSessionId}`}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start mb-2 text-left ${isActive ? 'bg-gray-300 hover:bg-gray-300' : ''}`}
              >
                <MessageCircle size={20} className="mr-2 flex-shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <div className="truncate">{chat.chatName}</div>
                  <div className="text-xs text-gray-500">{chat.createdAt.toLocaleString()}</div>
                </div>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  );
}