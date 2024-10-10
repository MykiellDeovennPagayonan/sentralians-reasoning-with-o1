'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { UploadCloud, RotateCcw, Download, Eraser, Paintbrush } from 'lucide-react'
import fetchGenerateAIResponse from '@/utils/fetchGenerateAIResponse'
import saveImage from '@/utils/saveImage'
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { GPT4oMessagesInput, O1MessagesInput } from '@/lib/types'

interface DrawingCanvasProps {
  messages: GPT4oMessagesInput[] | O1MessagesInput[];
  setMessages: React.Dispatch<React.SetStateAction<GPT4oMessagesInput[] | O1MessagesInput[]>>;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ messages, setMessages }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush')
  const [uploading, setUploading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.strokeStyle = tool === 'eraser' ? 'white' : color

      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  const downloadDrawing = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'drawing.png'
      link.click()
    }
  }

  const uploadImage = async () => {
    const canvas = canvasRef.current
    if (canvas) {
      const image = canvas.toDataURL('image/png')
      const blob = await (await fetch(image)).blob()
      const file = new File([blob], 'drawing.png', { type: 'image/png' })

      const formData = new FormData()
      formData.append('image', file)

      setUploading(true)

      try {
        const imageUrl = await saveImage(formData)

        const message: ChatCompletionMessageParam =
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }

        setMessages([...messages, message])

        const reply = await fetchGenerateAIResponse([message])

        console.log(reply.content)

        setIsSuccessful(true)

        alert('Image uploaded successfully!')
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('An error occurred while uploading the image.')
      } finally {
        setUploading(false)
      }
    } else {
      alert('Canvas ref is not available.')
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          className="border-4 border-gray-300 rounded-lg shadow-inner bg-white"
        />
        <div className="absolute bottom-2 left-2 bg-white p-2 rounded-md shadow">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 border-none cursor-pointer"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => setTool('brush')} variant={tool === 'brush' ? 'default' : 'outline'}>
          <Paintbrush className="w-4 h-4 mr-2" />
          Brush
        </Button>
        <Button onClick={() => setTool('eraser')} variant={tool === 'eraser' ? 'default' : 'outline'}>
          <Eraser className="w-4 h-4 mr-2" />
          Eraser
        </Button>
      </div>
      <div className="w-full max-w-xs flex items-center space-x-2">
        <span className="text-sm font-medium">Size:</span>
        <Slider
          value={[brushSize]}
          onValueChange={(value) => setBrushSize(value[0])}
          max={20}
          step={1}
        />
        <span className="text-sm font-medium w-8">{brushSize}</span>
      </div>
      <div className="flex space-x-2">
        <Button onClick={clearCanvas} variant="destructive">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button onClick={downloadDrawing} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        {!isSuccessful && (
          <Button onClick={uploadImage} variant="outline" disabled={uploading}>
            <UploadCloud className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        )}
        {isSuccessful && (
          <span className="text-green-500 font-medium">Uploaded Successfully!</span>
        )}
      </div>
    </div>
  )
}

export default DrawingCanvas