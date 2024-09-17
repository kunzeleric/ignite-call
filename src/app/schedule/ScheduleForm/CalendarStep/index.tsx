import { Calendar } from '@/components/calendar'

export function CalendarStep() {
  const isDateSelected = true

  return (
    <div
      className={`mx-6 bg-gray-800 rounded-md mt-4 p-6 grid relative ${isDateSelected ? 'grid-cols-[1fr,_280px]' : 'grid-cols-1 w-[540px]'}`}
    >
      <Calendar />
      {isDateSelected && (
        <div className="pt-6 px-6 pb-0 absolute w-[280px] right-0 top-0 bottom-0 overflow-y-scroll border-l-2 border-gray-600">
          <h2 className="font-bold text-center mb-3">
            terça-feira, <span className="font-normal">20 de setembro</span>
          </h2>
          <div className="grid grid-cols-1 gap-2 font-medium max-[900px]:grid-cols-2">
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              9:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              10:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              11:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              12:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              13:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              14:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              15:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              16:00h
            </button>
            <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-400">
              17:00h
            </button>
            <button className="bg-gray-600 mb-6 w-full py-2 rounded-md hover:bg-gray-400">
              18:00h
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
