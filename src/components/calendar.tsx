import { getWeekDays } from '@/utils/get-week-days'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/axios'
import { usePathname } from 'next/navigation'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ onDateSelected, selectedDate }: CalendarProps) {
  const pathParams = usePathname()

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDates>({
    queryKey: ['blocked-dates'],
    queryFn: async () => {
      const response = await api.get(`/users/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
          user: pathParams.split('/')[2],
        },
      })
      return response.data
    },
  })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) return []

    // creates an array of arrays representing each day in the current month
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    // gets the first day of the current month
    const firstWeekDay = currentDate.get('day')

    // creates an array to fill the first week with previous month's days
    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')) ||
            blockedDates.blockedDates.includes(date.get('date')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <div className="">
      <div className="flex justify-between pb-6">
        <h2 className="capitalize">
          {currentMonth}, {currentYear}
        </h2>
        <div className="flex gap-4 items-center">
          <CaretLeft
            className="cursor-pointer"
            onClick={handlePreviousMonth}
            weight="bold"
            size={20}
          />
          <CaretRight
            className="cursor-pointer"
            onClick={handleNextMonth}
            weight="bold"
            size={20}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr className="flex justify-around mt-2">
            {shortWeekDays.map((day, index) => {
              return (
                <th className="w-16" key={index}>
                  {day}.
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr className="flex justify-around mt-2" key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <button
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                        className="w-16 aspect-square disabled:bg-transparent disabled:cursor-default disabled:opacity-40 bg-gray-600 [&:not(:disabled):hover]:bg-gray-500 text-center rounded-md cursor-pointer"
                      >
                        {date.get('date')}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
