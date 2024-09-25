import { api } from '@/app/lib/axios'
import { Calendar } from '@/components/calendar'
import dayjs from 'dayjs'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const pathParams = usePathname()
  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) return

    api
      .get(
        `/users/availability?user=${pathParams.split('/')[2]}&date=${dayjs(selectedDate).format('YYYY-MM-DD')}`,
      )
      .then((response) => {
        setAvailability(response.data)
      })
  }, [selectedDate, pathParams])

  return (
    <div
      className={`mx-6 bg-gray-800 rounded-md mt-4 p-6 grid relative ${isDateSelected ? 'grid-cols-[1fr,_280px]' : 'grid-cols-1 w-[540px]'}`}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <div className="pt-6 px-6 pb-0 absolute w-[280px] right-0 top-0 bottom-0 overflow-y-scroll border-l-2 border-gray-600">
          <h2 className="font-bold text-center mb-3">
            {weekDay}, <span className="font-normal">{describedDate}</span>
          </h2>
          <div className="grid grid-cols-1 gap-2 font-medium max-[900px]:grid-cols-2">
            {availability?.possibleTimes.map((hour) => {
              return (
                <button
                  key={hour}
                  disabled={!availability?.availableTimes.includes(hour)}
                  className="bg-gray-600 disabled:bg-transparent w-full py-2 rounded-md hover:bg-gray-400"
                >
                  {String(hour).padStart(2, '0')}:00h
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
