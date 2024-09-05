import { IntervalItem } from './interval-item'

export default function TimeIntervals() {
  return (
    <main className="max-w-[572px] mt-28 mx-auto mb-4 px-4">
      <div className="px-6">
        <h1 className="leading-normal text-xl font-bold">Quase lá</h1>
        <p className="text-gray-200 mb-6">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
      </div>
      <div className="px-4 py-6 bg-gray-800 flex flex-col rounded-md">
        <div className="border border-gray-600 rounded-md mb-4">
          <IntervalItem text="Segunda-feira" />
          <IntervalItem text="Terça-feira" />
        </div>
      </div>
    </main>
  )
}
