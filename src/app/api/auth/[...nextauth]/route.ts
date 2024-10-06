import NextAuth from 'next-auth';
import GoogleProviders from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ]
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}