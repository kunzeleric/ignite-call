import { ComponentProps, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`flex text-sm justify-center items-center gap-2 px-4 py-2 rounded-md ${className} text-white duration-300 bg-green-500 hover:bg-green-600`}
      {...props}
    >
      {children}
    </button>
  )
}
