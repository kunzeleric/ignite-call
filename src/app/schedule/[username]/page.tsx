/* eslint-disable @next/next/no-img-element */
'use client'

import { useSession } from 'next-auth/react'
import { ScheduleForm } from '../ScheduleForm'

export default function Schedule() {
  const session = useSession()

  if (!session || session.status === 'loading') return

  return (
    <main className="flex items-center justify-center mt-28">
      <div className="max-w-[852px] py-4">
        <div className="flex flex-col items-center">
          <img
            src={session.data?.user.avatar_url}
            alt="Foto de perfil"
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-white text-2xl font-bold">
            {session.data?.user.name}
          </h1>
          <p className="text-gray-200 mt-2">Front Developer @Grafiniti</p>
        </div>
        <ScheduleForm />
      </div>
    </main>
  )
}
