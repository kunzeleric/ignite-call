import { getWeekDays } from '@/utils/get-week-days'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
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
          <tr className="flex justify-around mt-2">
            <td className="w-16 aspect-square"></td>
            <td className="w-16 aspect-square"></td>
            <td className="w-16 aspect-square"></td>
            <td className="w-16 aspect-square"></td>
            <td>
              <button
                disabled
                className="w-16 aspect-square disabled:bg-transparent disabled:cursor-default disabled:opacity-40 bg-gray-600 [&:not(:disabled):hover]:bg-gray-500 text-center rounded-md cursor-pointer"
              >
                1
              </button>
            </td>
            <td>
              <button className="w-16 aspect-square disabled:bg-transparent disabled:cursor-default disabled:opacity-40 bg-gray-600 [&:not(:disabled):hover]:bg-gray-500 text-center rounded-md cursor-pointer">
                2
              </button>
            </td>
            <td>
              <button className="w-16 aspect-square disabled:bg-transparent disabled:cursor-default disabled:opacity-40 bg-gray-600 [&:not(:disabled):hover]:bg-gray-500 text-center rounded-md cursor-pointer">
                3
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
