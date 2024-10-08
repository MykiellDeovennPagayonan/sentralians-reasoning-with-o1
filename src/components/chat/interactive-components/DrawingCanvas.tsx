"use client";

import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import axios from 'axios';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [myP5, setMyP5] = useState<p5 | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current) {
      // Define the p5 sketch
      const sketch = (p: p5) => {
        let isDrawing = false;
        let previousX = 0;
        let previousY = 0;

        p.setup = () => {
          // Create a canvas that fits the parent div
          const parentWidth = canvasRef.current!.clientWidth;
          p.createCanvas(parentWidth, 500).parent(canvasRef.current!);
          p.background(255); // White background
        };

        p.draw = () => {
          if (isDrawing) {
            p.stroke(0); // Black color for drawing
            p.strokeWeight(2); // Thickness of the line
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

      // Initialize the p5 sketch
      const newP5 = new p5(sketch);
      setMyP5(newP5);

      // Cleanup on component unmount
      return () => {
        newP5.remove();
      };
    }
  }, []);

  const uploadImage = async () => {
    if (myP5) {
      // Get the image as a Blob
      const canvasDataUrl = myP5.canvas.toDataURL('image/png');
      
      // Convert base64 to Blob
      const response = await fetch(canvasDataUrl);
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], 'drawing.png', { type: 'image/png' });

      // Upload the image using Axios
      const formData = new FormData();
      formData.append('image', file);

      try {
        const uploadResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadResponse.status === 200) {
          alert('Image uploaded successfully!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
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
