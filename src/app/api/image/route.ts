/* eslint-disable @typescript-eslint/no-explicit-any */
// /pages/api/products/image/upload.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/utils/s3Bucket';
import multer from 'multer';
import sharp from 'sharp';
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const multerPromise = (req: NextRequest, res: NextResponse) =>
  new Promise<void>((resolve, reject) => {
    upload.single('image')(req as any, res as any, (err: any) => {
      if (err) reject(err);
      resolve();
    });
  });

export async function POST(req: any, res: NextResponse) {
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

  try {
    await multerPromise(req, res);

    if (!req.file) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    if (req.file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: 'Image file is too large' }, { status: 413 });
    }

    const imageName = generateFileName(); 
    const fileBuffer = await sharp(req.file.buffer).toBuffer();

    await uploadFile(fileBuffer, imageName, req.file.mimetype);

    return NextResponse.json({ imageName }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
