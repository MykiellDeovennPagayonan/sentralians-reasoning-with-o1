import { Message, Content } from '@prisma/client'
import prisma from '@/lib/db';

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
  { params }: { params: { chatSessionId: string } }
) {
  try {
    const response: Message & { content: Content[] } = await request.json();

    await prisma.message.create({
      data: {
        role: response.role,
        chatSessionId: params.chatSessionId,
        content: {
          createMany: {
            data: response.content.map((content) => {
              return {
                contentType: content.contentType,
                text: content.text
              }
            })
          }
        }
      }
    })
  } catch (error) {
    return Response.json({ message: error }, { status: 500 })
  }
}