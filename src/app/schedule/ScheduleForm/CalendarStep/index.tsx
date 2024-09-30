import { api } from '@/app/lib/axios'
import { Calendar } from '@/components/calendar'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const pathParams = usePathname()
  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/availability}`, {
        params: {
          date: selectedDateWithoutTime,
          user: pathParams.split('/')[2],
        },
      })
      return response.data
    },
    enabled: !!selectedDate,
  })

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

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
                  onClick={() => handleSelectTime(hour)}
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
