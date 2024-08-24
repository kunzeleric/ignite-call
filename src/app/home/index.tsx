import previewImage from '@/assets/calendar.png'
import { ClaimUserNameForm } from '@/components/claim-user-name-form'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex h-screen items-center max-w-[calc(100vw-(100vw-1160px)/2)] gap-20 ml-auto">
      <div className="max-w-[480px] px-10">
        <h1 className="text-4xl font-extrabold leading-snug">
          Agendamento Descomplicado
        </h1>
        <p className="text-lg mt-2 text-gray-200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUserNameForm />
      </div>
      <div className="pr-8 sm:hidden w-[700px] h-[400px]">
        <Image
          className="h-full w-full"
          src={previewImage}
          width={400}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
          aria-label='"Calendário simbolizando aplicação em funcionamento"'
        />
      </div>
    </div>
  )
}
