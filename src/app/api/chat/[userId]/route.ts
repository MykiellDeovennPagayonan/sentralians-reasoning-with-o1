import prisma from "@/lib/db"
import { Chat, Content, Message } from "@prisma/client";

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

    return Response.json(chats)
  } catch (error) {
    return Response.json({ message: error }, { status: 500 })
  }
}

// user types something, sends it.
// chat is created, messages are added.
// triggered when the user presses enter on their initial message
// (same flow as creating a new chat with chatgpt)

// fetch structure for the post method would look like:
// const response = await fetch('/api/chat/<userid>', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     chatName: "pizza quiz",
//     messages: [
//       {
//         "role": "system",
//         "content": [
//           {
//             "type": "text",
//             "text": "you bring up pizzas at every conversation"
//           }
//         ]
//       },
//       {
//         "role": "user",
//         "content": [
//           {
//             "type": "text",
//             "text": "<image link here>"
//           },
//           {
//             "type": "text",
//             "text": "im bored, quiz me on pizzas\n"
//           }
//         ]
//       },    
//       {
//         role: "assistant",
//         messageType: "quiz",
//         content: [
//           {
//             type: "quiz",
//             text: "What is the capital of pizza?"
//           }
//         ]
//       }
//     ]
//   }),
// });

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const response: Chat & (Message & { content: Content[] })[] = await request.json();

    // securtiy for unauthorized users
    if (response.userId !== params.userId) {
      return Response.json({ message: "userId in the request body does not match the userId in the URL" }, { status: 400 })
    }

    // still unsure how to handle the chatname yet.
    // im thinking of automatically generated chat names when you create a chat
    // just like chatgpt. tho i dunno how it is implemented.
    await prisma.chat.create({
      data: {
        userId: params.userId,
        chatName: response.chatName,
        messages: {
          createMany: {
            data: response.map((message) => {
              return {
                role: message.role,
                messageType: message.messageType,
                content: {
                  createMany: {
                    data: message.content.map((content) => {
                      return {
                        type: content.contentType,
                        text: content.text
                      }
                    })
                  }
                }
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