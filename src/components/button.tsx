import { ComponentProps, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
  variation?: 'primary' | 'secondary'
}

export function Button({
  variation = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const externalClasses = `${className} 
  ${
    variation === 'primary'
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-gray-200 hover:bg-gray-400'
  }`

  return (
    <button
      className={`flex text-sm justify-center items-center gap-2 px-4 py-2 rounded-md ${externalClasses} text-white duration-300`}
      {...props}
    >
      {children}
    </button>
  )
}
