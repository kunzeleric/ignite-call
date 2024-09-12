'use client'

import { Button } from '@/components/button'
import { Check } from '@phosphor-icons/react'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ConnectCalendar() {
  const session = useSession()
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const hasAuthError = searchParams.has('error')

  const isSignedIn = session?.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

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
            {isSignedIn ? (
              <Button
                disabled
                variation="secondary"
                className="disabled:cursor-not-allowed"
              >
                Conectado <Check />
              </Button>
            ) : (
              <Button onClick={handleConnectCalendar} variation="primary">
                Conectar <ArrowRight />
              </Button>
            )}
          </div>
          {hasAuthError && (
            <p className="text-red-400 mb-2 text-sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </p>
          )}
          <Button
            variation={isSignedIn ? 'primary' : 'secondary'}
            type="submit"
            className="disabled:cursor-not-allowed"
            onClick={() => push('/register/time-intervals')}
            disabled={!isSignedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </div>
      </div>
    </main>
  )
}
