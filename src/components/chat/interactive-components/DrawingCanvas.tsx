"use client";

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import axios from 'axios';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import fetchGenerateAIResponse from '@/utils/fetchGenerateAIResponse';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

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

      const newP5 = new p5(sketch);

      return () => {
        newP5.remove();
      };
    }
  }, []);

  const uploadImage = async () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current.querySelector('canvas') as HTMLCanvasElement | null;

      if (!canvasElement) {
        alert('Canvas element not found.');
        return;
      }

      try {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvasElement.toBlob((b) => resolve(b), 'image/png');
        });

        if (!blob) {
          alert('Failed to convert canvas to image.');
          return;
        }

        const file = new File([blob], 'drawing.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append('image', file);

        const uploadResponse = await axios.post(`/api/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const iamgeName = uploadResponse.data.imageName

        const imageUrlResponse = await axios.get(`/api/image/${iamgeName}`);
        console.log(imageUrlResponse.data.imageUrl)

        const messages : ChatCompletionMessageParam[] = [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageUrlResponse.data.imageUrl
                }
              }
            ]
          }
        ]

        const reply = await fetchGenerateAIResponse(messages)

        console.log(reply.content   )

        if (uploadResponse.status === 201) {
          alert('Image uploaded successfully!');
        } else {
          console.error('Upload failed with status:', uploadResponse.status);
          alert('Failed to upload image.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
      }
    } else {
      alert('Canvas ref is not available.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[600px] bg-gray-100 p-4 min-h-screen">
      <div
        ref={canvasRef}
        className="w-full max-w-3xl border-2 border-gray-300 shadow-md"
      ></div>
      <button
        onClick={uploadImage}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Upload as PNG
      </button>
    </div>
  );
};

export default DrawingCanvas;