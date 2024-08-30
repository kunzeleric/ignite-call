import { ReactNode } from 'react'

export function FormAnnotation({ children }: { children: ReactNode }) {
  return <div className="mt-2 text-gray-400 ">{children}</div>
}
