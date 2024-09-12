import { PrismaAdapter } from '@/app/lib/auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

export const authOptions = (req: NextRequest): NextAuthOptions => {
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
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            username: '',
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      async signIn() {
        return true
      },
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

async function auth(req: NextRequest) {
  return authOptions(req)
}

const handler = async (
  req: NextRequest,
  routeContext: { params: { nextauth: string[] } },
) => {
  return NextAuth(req, routeContext, await auth(req))
}

export { handler as GET, handler as POST }
