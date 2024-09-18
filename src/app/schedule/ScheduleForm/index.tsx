import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  return (
    <div className="w-full max-w-[852px]">
      <CalendarStep />
      {/* <ConfirmStep /> */}
    </div>
  )
}
