'use client'

import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation } from './form-annotation'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Necessário pelo menos 5 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Formato incorreto, somente letras e hifens.',
    })
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className="grid grid-cols-[1fr_auto] gap-2 mt-4 p-4 bg-gray-800 rounded-lg"
      >
        <input
          type="text"
          placeholder="ignite.com/seu-usuario"
          className="bg-gray-900 px-2 rounded-md py-2"
          {...register('username')}
        />
        <Button type="submit">
          Reservar usuário
          <ArrowRight />
        </Button>
      </form>
      <FormAnnotation>
        <p className="text-sm">
          {errors.username
            ? errors.username.message
            : 'Digite pelo menos 5 caracteres.'}
        </p>
      </FormAnnotation>
    </>
  )
}
