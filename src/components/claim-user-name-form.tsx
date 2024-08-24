import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/button'

export function ClaimUserNameForm() {
  return (
    <form className="grid grid-cols-[1fr_auto] gap-2 mt-4 p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        placeholder="ignite.com/seu-usuario"
        className="bg-gray-900 px-2 rounded-md py-2"
      />
      <Button type="submit">
        Reservar usuário
        <ArrowRight />
      </Button>
    </form>
  )
}
