import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions(req))

  if (!session) {
    return NextResponse.json(
      { message: 'Usuário não autenticado!' },
      { status: 401 },
    )
  }

  const body = await req.json()
  const { intervals } = timeIntervalsBodySchema.parse(body)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => ({
      week_day: interval.weekDay,
      time_start_in_minutes: interval.startTimeInMinutes,
      time_end_in_minutes: interval.endTimeInMinutes,
      user_id: session.user?.id,
    })),
  })

  return NextResponse.json({}, { status: 201 })
}
