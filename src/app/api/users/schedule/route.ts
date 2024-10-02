import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { z } from 'zod'
import dayjs from 'dayjs'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('user') || ''

  const body = await req.json()

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist!' },
      { status: 400 },
    )

  const createSchedulingBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime(),
  })

  const { name, email, observations, date } =
    createSchedulingBodySchema.parse(body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date()))
    return NextResponse.json(
      { message: 'Date is in the past!' },
      { status: 400 },
    )

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling)
    return NextResponse.json(
      { message: 'There is another scheduling at the same time!' },
      { status: 400 },
    )

  await prisma.scheduling.create({
    data: {
      date: schedulingDate.toDate(),
      name,
      email,
      observations,
      user_id: user.id,
    },
  })

  return NextResponse.json({}, { status: 201 })
}
