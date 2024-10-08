import prisma from "@/lib/db"
import { Chat } from "@prisma/client";
import { NextResponse } from "next/server";

// gets all chats for a user
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: params.userId
      }
    })

    return NextResponse.json(chats)
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

// creates a new chat

// fetch structure for the post method would look like:
// const response = await fetch('/api/chat/<userid>', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     chatName: "pizza quiz",
//   }),
// });
//
// const data = await response.json();
// const chatSessionId = data.chatSessionId; // gets the session id
// you can use this session id to call the API for appending new messages to chat

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body: Chat = await request.json();

    // still unsure how to handle the chatname yet.
    // im thinking of automatically generated chat names when you create a chat
    // just like chatgpt. tho i dunno how it is implemented.
    const newChat = await prisma.chat.create({
      data: {
        chatName: body.chatName,
        userId: params.userId
      },
    })

    // returns chatsession id from the newly created chat.
    // the session id will be used to append messages to the chat.
    return NextResponse.json({ chatSessionId: newChat.chatSessionId }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}