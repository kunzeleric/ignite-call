import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import dayjs from 'dayjs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('user') || ''
  const year = searchParams.get('year') || ''
  const month = searchParams.get('month') || ''

  if (!year || !month)
    return NextResponse.json(
      { message: 'Year or month not specified!' },
      { status: 400 },
    )

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist!' },
      { status: 400 },
    )

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: { week_day: true },
    where: { user_id: user.id },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw = await prisma.$queryRaw`
    SELECT * 
    FROM schedulings S

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
  `

  return NextResponse.json(
    { blockedWeekDays, blockedDatesRaw },
    { status: 200 },
  )
}
