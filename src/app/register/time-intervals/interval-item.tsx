interface IntervalItemProps {
  text: string
}

export function IntervalItem({ text }: IntervalItemProps) {
  return (
    <div className="flex justify-between items-center border-t border-gray-600 py-3 px-4 first:border-t-0">
      <div className="flex gap-4">
        <input type="checkbox" />
        <p className="text-white text-base">{text}</p>
      </div>
      <div className="flex gap-2">
        <input
          className="text-sm bg-gray-900 rounded-md text-white px-2 py-2 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
          type="time"
          step={60}
        />
        <input
          className="text-sm bg-gray-900 rounded-md text-white px-2 py-2 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
          type="time"
          step={60}
        />
      </div>
    </div>
  )
}
