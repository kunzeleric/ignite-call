'use client'

import { Roboto_Flex } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import '@/app/lib/dayjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900 text-gray-100`}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
