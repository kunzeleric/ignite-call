'use client'

import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const { query } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function onSubmit(data: RegisterFormData) {
    console.log(data)
  }

  useEffect(() => {
    if (query.username) setValue('username', String(query.username))
  }, [query?.username, setValue])

  return (
    <main className="max-w-[572px] mt-28 mx-auto mb-4 px-4">
      <div className="px-6">
        <h1 className="leading-normal text-xl font-bold">
          Bem-vindo ao Ignite Call!
        </h1>
        <p className="text-gray-200 mb-6">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-[1fr] gap-6 mt-4 p-4 bg-gray-800 rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <label className="text-white">Nome do usuário</label>
            <input
              placeholder="ignite.com/seu-usuario"
              type="text"
              className="bg-gray-900 px-3 rounded-md py-2"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">Nome completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              className="bg-gray-900 px-3 rounded-md py-2"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </form>
      </div>
    </main>
  )
}
