import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import dayjs from 'dayjs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('user') || ''
  const date = searchParams.get('date') || ''

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist!' },
      { status: 400 },
    )

  const referenceDate = dayjs(date)

  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate)
    return NextResponse.json({ possibleTimes: [], availableTimes: [] })

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability)
    return NextResponse.json({ possibleTimes: [], availableTimes: [] })

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )
  })

  return NextResponse.json({ possibleTimes, availableTimes }, { status: 201 })
}
