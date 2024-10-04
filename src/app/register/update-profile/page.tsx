/* eslint-disable @next/next/no-img-element */
'use client'

import { api } from '@/app/lib/axios'
import { Button } from '@/components/button'
import { ArrowRight } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateProfileSchema = z.object({
  bio: z
    .string()
    .min(50, { message: 'Mínimo de 50 caracteres.' })
    .max(500, { message: 'Máximo de 500 caracteres.' }),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>()

  const session = useSession()
  const { push } = useRouter()

  if (!session || session.status === 'loading') return

  async function onSubmit(data: UpdateProfileData) {
    await api.put('/users', {
      bio: data.bio,
      id: session.data?.user.id,
    })

    await push(`/schedule/${session?.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <main className="max-w-[572px] mt-28 mx-auto mb-4 px-4">
        <div className="px-6">
          <h1 className="leading-normal text-xl font-bold">
            Defina seu Perfil
          </h1>
          <p className="text-gray-200 mb-6">
            Por último, uma breve descrição e uma foto de perfil.
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-[1fr] gap-6 mt-4 p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm">Foto de perfil</p>
              <div className="flex gap-4 items-center">
                <img
                  src={session.data?.user.avatar_url}
                  alt="Foto de perfil"
                  className="w-16 h-16 rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm">Descrição</p>
              <textarea
                className="bg-gray-900 px-3 rounded-md py-2 w-full h-24 resize-none"
                {...register('bio')}
              />
              <p className="text-gray-200 text-sm mt-1">
                Fale um pouco sobre você, isto será exibido em sua página
                pessoal.
              </p>
            </div>
            <Button variation="primary" disabled={isSubmitting} type="submit">
              Finalizar
              <ArrowRight />
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}
