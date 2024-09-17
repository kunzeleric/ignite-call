import { getWeekDays } from '@/utils/get-week-days'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="">
      <div className="flex justify-between pb-6">
        <h2>Setembro, 2024</h2>
        <div className="flex gap-4 items-center">
          <CaretLeft weight="bold" size={20} />
          <CaretRight weight="bold" size={20} />
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
