"use client";

import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import fetchGenerateAIResponse from '@/utils/fetchGenerateAIResponse';
import saveImage from '@/utils/saveImage';
import { GPT4oMessagesInput, O1MessagesInput } from '@/lib/types';

interface DrawingCanvasProps {
  messages: GPT4oMessagesInput[] | O1MessagesInput[];
  setMessages: React.Dispatch<React.SetStateAction<GPT4oMessagesInput[] | O1MessagesInput[]>>;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ messages, setMessages }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current) {
      const sketch = (p: p5) => {
        let isDrawing = false;
        let previousX = 0;
        let previousY = 0;

        p.setup = () => {
          const parentWidth = canvasRef.current!.clientWidth;
          const canvas = p.createCanvas(parentWidth, 500);
          canvas.parent(canvasRef.current!);
          p.background(255);
        };

        p.draw = () => {
          if (isDrawing) {
            p.stroke(0);
            p.strokeWeight(2);
            p.line(previousX, previousY, p.mouseX, p.mouseY);
            previousX = p.mouseX;
            previousY = p.mouseY;
          }
        };

        p.mousePressed = () => {
          if (p.mouseButton === p.LEFT) {
            isDrawing = true;
            previousX = p.mouseX;
            previousY = p.mouseY;
          }
        };

        p.mouseReleased = () => {
          isDrawing = false;
        };

        p.windowResized = () => {
          const parentWidth = canvasRef.current!.clientWidth;
          p.resizeCanvas(parentWidth, 500);
          p.background(255);
        };
      };

      p5InstanceRef.current = new p5(sketch);

      return () => {
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }
      };
    }
  }, []);

  const resetCanvas = () => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.background(255);
    } else {
      alert('Canvas is not initialized yet.');
    }
  };

  const uploadImage = async () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current.querySelector('canvas') as HTMLCanvasElement | null;

      if (!canvasElement) {
        alert('Canvas element not found.');
        return;
      }

      setUploading(true);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvasElement.toBlob((b) => resolve(b), 'image/png');
      });

      if (!blob) {
        alert('Failed to convert canvas to image.');
        setUploading(false);
        return;
      }

      const file = new File([blob], 'drawing.png', { type: 'image/png' });

      const formData = new FormData();
      formData.append('image', file);

      try {

        const imageUrl = await saveImage(formData);

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
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
      } finally {
        setUploading(false);
      }
    } else {
      alert('Canvas ref is not available.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[600px] bg-gray-100 p-4 aspect-[16/9]">
      <div
        ref={canvasRef}
        className="w-full max-w-3xl border-2 border-gray-300 shadow-md"
      ></div>
      <div className="mt-4 flex space-x-2">
        {!isSuccessful && (
          <button
            onClick={uploadImage}
            disabled={uploading}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {uploading ? 'Uploading...' : 'Upload Drawing'}
          </button>
        )}
        <button
          onClick={resetCanvas}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset Drawing
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;