import { prisma } from '@/app/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, username } = body

  const userExists = await prisma.user.findUnique({ where: { username } })

  if (userExists) {
    return NextResponse.json(
      { error: 'Usuário já cadastrado.' },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  cookies().set('@ignite-call/user-id', user.id, {
    maxAge: 60 * 60 * 24 * 7, // duração de 7 dias
    path: '/',
  })

  return NextResponse.json({ user }, { status: 201 })
}
