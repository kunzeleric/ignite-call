'use client'

import { api } from '@/app/lib/axios'
import { Button } from '@/components/button'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana.',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distance do início.',
      },
    ),
})

type TimeIntervalFormDataInput = z.input<typeof timeIntervalFormSchema>
type TimeIntervalsFormDataOutput = z.output<typeof timeIntervalFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<TimeIntervalFormDataInput, unknown, TimeIntervalsFormDataOutput>({
    resolver: zodResolver(timeIntervalFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { push } = useRouter()

  const weekDays = getWeekDays({ short: false })

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormDataOutput) {
    await api.post('/users/time-intervals', data)
  }

  return (
    <>
      <NextSeo title="Selecione sua disponibilidade | Ignite Call" noindex />
      <main className="max-w-[572px] mt-28 mx-auto mb-4 px-4">
        <div className="px-6">
          <h1 className="leading-normal text-xl font-bold">Quase lá</h1>
          <p className="text-gray-200 mb-6">
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </p>
        </div>
        <div className="px-4 py-6 bg-gray-800 flex flex-col rounded-md">
          <form
            id="weekDaysForm"
            onSubmit={handleSubmit(handleSetTimeIntervals)}
            className="border border-gray-600 rounded-md mb-4"
          >
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="flex justify-between items-center border-t border-gray-600 py-3 px-4 first:border-t-0"
                >
                  <div className="flex gap-4">
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field: renderField }) => {
                        return (
                          <input
                            onChange={(e) =>
                              renderField.onChange(e.target.checked)
                            }
                            checked={renderField.value}
                            type="checkbox"
                          />
                        )
                      }}
                    />
                    <p className="text-white text-base">
                      {weekDays[field.weekDay]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="text-sm disabled:bg-gray-600 bg-gray-900 rounded-md text-white px-2 py-2 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.startTime`)}
                      disabled={intervals[index].enabled === false}
                    />
                    <input
                      className="text-sm disabled:bg-gray-600 bg-gray-900 rounded-md text-white px-2 py-2 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.endTime`)}
                      disabled={intervals[index].enabled === false}
                    />
                  </div>
                </div>
              )
            })}
          </form>
          {errors.intervals && (
            <p className="text-red-400 mb-2 text-sm">
              {errors.intervals.root?.message}
            </p>
          )}
          <Button
            disabled={isSubmitting}
            onClick={() => push('/register/update-profile')}
            form="weekDaysForm"
            type="submit"
          >
            Próximo passo <ArrowRight />
          </Button>
        </div>
      </main>
    </>
  )
}
