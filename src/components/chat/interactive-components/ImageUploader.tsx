"use client"
import React, { useState, ChangeEvent } from 'react';
import saveImage from '@/utils/saveImage';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { GPT4oMessagesInput, O1MessagesInput } from '@/lib/types';

interface ImageUploaderProps {
  messages: GPT4oMessagesInput[] | O1MessagesInput[];
  setMessages: React.Dispatch<React.SetStateAction<GPT4oMessagesInput[] | O1MessagesInput[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ messages, setMessages }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0])
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadResult(null);

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

      setIsSuccessful(true)

      setMessages([...messages, message])
      setUploadResult('Image uploaded successfully! URL: ' + imageUrl);
    } catch (error) {
      console.log(error)
      setUploadResult('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Image Uploader</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Select an image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </div>
        {!isSuccessful &&
          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        }
      </form>
      {uploadResult && (
        <p className={`mt-4 text-sm ${uploadResult.includes('failed') || uploadResult.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
          {uploadResult}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;