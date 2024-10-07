import { Chat, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// gets the chat for the user with a specific session id
// (this is the chat that the user is currently in)
export async function GET(
  { params }: { params: { userId: string, chatSessionId: string } }
) {
  try {
    const chats = await prisma.chat.findUnique({
      where: {
        chatSessionId: params.chatSessionId
      },
      include: {
        messages: {
          include: {
            content: true
          }
        }
      }
    })

    return Response.json(chats)
  } catch (error) {
    return Response.json({ message: error }, { status: 500 })
  }
}

// user updates chat name

export async function PUT(
  request: Request,
  { params }: { params: { userId: string, chatSessionId: string } }
) {
  try {
    const response: Chat = await request.json()

    // additional security for unauthorized updates
    if (response.userId !== params.userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await prisma.chat.update({
      where: {
        chatSessionId: params.chatSessionId
      },
      data: {
        chatName: response.chatName
      }
    })

    return Response.json({ message: 'Chat name updated' })
  } catch (error) {
    return Response.json({ message: error }, { status: 500 })
  }
}


// user deletes the specific chat

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string, chatSessionId: string } }
) {
  try {
    const response: Chat = await request.json()

    // additional security for unauthorized deletes
    if (response.userId !== params.userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await prisma.chat.delete({
      where: {
        chatSessionId: params.chatSessionId
      }
    })

    return Response.json({ message: 'Chat deleted' })
  } catch (error) {
    return Response.json({ message: error }, { status: 500 })
  }
}