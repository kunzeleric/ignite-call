'use client'

import { Button } from '@/components/button'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export default function Register() {
  async function onSubmit() {}

  return (
    <main className="max-w-[572px] mt-28 mx-auto mb-4 px-4">
      <div className="px-6">
        <h1 className="leading-normal text-xl font-bold">
          Conecte sua agenda!
        </h1>
        <p className="text-gray-200 mb-6">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
      </div>
      <div className="px-4 py-6 bg-gray-800">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-md border border-gray-600">
            <p className="text-gray-200">Google Calendar</p>
            <Button variation="primary">
              Conectar <ArrowRight />
            </Button>
          </div>
          <Button variation="secondary" type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </div>
      </div>
    </main>
  )
}
