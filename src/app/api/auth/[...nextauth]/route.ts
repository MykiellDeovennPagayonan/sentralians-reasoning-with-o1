import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export async function GET(request: NextRequest) {
  return NextAuth(authOptions)(request, NextResponse);
}

export async function POST(request: NextRequest) {
  return NextAuth(authOptions)(request, NextResponse);
}
