'use client'

import { SendIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GPT4oMessagesInput, O1MessagesInput } from '@/lib/types'
import AIChatMessages from './AIChatMessages'
import fetchGenerateAIResponse from '@/utils/fetchGenerateAIResponse'

export default function AIChat() {
  const [messages, setMessages] = useState<(GPT4oMessagesInput | O1MessagesInput)[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  }


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!input.trim() || isLoading) return

    const newUserMessage: O1MessagesInput = { role: 'user', content: input.trim() }
    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setInput('')
    setIsLoading(true)

    try {
      const aiResponse = await fetchGenerateAIResponse([...messages, newUserMessage])
      if (aiResponse.contentType === 'quiz' || aiResponse.contentType === 'ppt' || aiResponse.contentType == 'flashcards' || aiResponse.contentType == 'spelling' || aiResponse.contentType == "canvas" || aiResponse.contentType == "image") {
        const newAiMessage: O1MessagesInput | GPT4oMessagesInput = { role: 'assistant', content: aiResponse.content, componentMessageType: aiResponse.contentType }
        setMessages(prevMessages => [...prevMessages, newAiMessage])
        return
      }
      const newAiMessage: O1MessagesInput | GPT4oMessagesInput = { role: 'assistant', content: aiResponse.content }
      setMessages(prevMessages => [...prevMessages, newAiMessage])
    } catch (error) {
      console.error('Error generating AI response:', error)
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="flex flex-col w-full max-w-3xl h-full mx-auto px-4">
      <AIChatMessages messages={messages} setMessages={setMessages}/>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-2 border-black border-b-0 rounded-t-lg">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  )
}