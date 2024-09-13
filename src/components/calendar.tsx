import { getWeekDays } from '@/utils/get-week-days'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="w-full bg-gray-600 rounded-md min-w-[540px] px-4">
      <div className="flex justify-between py-2">
        <h2>Setembro, 2024</h2>
        <div className="flex gap-4 items-center">
          <CaretLeft weight="bold" size={20} />
          <CaretRight weight="bold" size={20} />
        </div>
      </div>
      <table>
        <thead>
          <tr className="flex gap-4">
            {shortWeekDays.map((day, index) => {
              return <th key={index}>{day}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
