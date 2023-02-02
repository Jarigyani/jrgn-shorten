// [...nextauth.js]
import prisma from '@/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProviders from 'next-auth/providers/google';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ account, profile, user }) {
      console.log(user);
      return true;
    },
  },
});
