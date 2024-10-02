/* eslint-disable @next/next/no-img-element */
'use client'

import { api } from '@/app/lib/axios'
import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmationFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome precisa de no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Digite um email válido.' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmationFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmationFormSchema),
  })

  const pathParams = usePathname()
  const username = pathParams.split('/')[2]

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { email, name, observations } = data
    await api.post(`/users/schedule?user=${username}`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <main className="min-w-[540px] bg-gray-800 rounded-lg mx-auto mt-6 mb-4 p-6">
      <div className="flex gap-4 items-center border-b-2 border-gray-600 pb-6">
        <div className="flex items-center gap-2">
          <CalendarBlank size={20} />
          <p className="text-white font-medium leading-none">{describedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} />
          <p className="text-white font-medium">{describedTime}</p>
        </div>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(handleConfirmScheduling)}
          className="grid grid-cols-[1fr] gap-6 mt-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-white">Seu nome</label>
            <input
              placeholder="ignite.com/seu-usuario"
              type="text"
              className="bg-gray-900 px-3 rounded-md py-2"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">Endereço de e-mail</label>
            <input
              type="text"
              placeholder="Seu nome"
              className="bg-gray-900 px-3 rounded-md py-2"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white">Observações</p>
            <textarea
              className="bg-gray-900 px-3 rounded-md py-2 w-full h-24 resize-none"
              {...register('observations')}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variation="secondary"
              className="bg-transparent"
              onClick={() => onCancelConfirmation()}
            >
              Cancelar
            </Button>
            <Button variation="primary">Confirmar</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
