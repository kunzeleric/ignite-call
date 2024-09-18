/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
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

export function ConfirmStep() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmationFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <main className="min-w-[540px] bg-gray-800 rounded-lg mx-auto mt-6 mb-4 p-6">
      <div className="flex gap-4 items-center border-b-2 border-gray-600 pb-6">
        <div className="flex items-center gap-2">
          <CalendarBlank size={20} />
          <p className="text-white font-medium leading-none">
            22 de Setembro de 2022
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} />
          <p className="text-white font-medium">18:00h</p>
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
            <Button variation="secondary" className="bg-transparent">
              Cancelar
            </Button>
            <Button variation="primary">Confirmar</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
