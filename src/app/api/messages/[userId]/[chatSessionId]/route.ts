import { Message, Content } from '@prisma/client'
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// the chat already exists, and the user sends more messages into the chat
// or the assistant replies to the user

// fetch structure for the post method would look like:
// const response = await fetch('/api/messages/<userid>/<sessionid>', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     message: {
//       "role": "user",
//       "content": [
//         {
//           "type": "text",
//           "text": "wow"
//         }
//       ]
//     }
//   }),
// });

export async function POST(
  request: Request,
  { params }: { params: { userId: string, chatSessionId: string } }
) {
  try {
    const body: Message & { content: Content[] } = await request.json();

    await prisma.chat.update({
      where: {
        chatSessionId: params.chatSessionId
      },
      data: {
        messages: {
          create: {
            role: body.role,
            content: {
              createMany: {
                data: body.content.map((content) => {
                  return {
                    contentType: content.contentType,
                    text: content.text
                  }
                })
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ message: 'Message sent' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}