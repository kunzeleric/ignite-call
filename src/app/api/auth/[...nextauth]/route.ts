import { PrismaAdapter } from '@/app/lib/auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

async function auth(req: NextRequest) {
  return {
    adapter: PrismaAdapter(req),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          },
        },
      }),
    ],
    callbacks: {
      async signIn() {
        return true
      },
    },
  } as NextAuthOptions
}

const handler = async (
  req: NextRequest,
  routeContext: { params: { nextauth: string[] } },
) => {
  return NextAuth(req, routeContext, await auth(req))
}

export { handler as GET, handler as POST }
