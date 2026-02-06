import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vivid Flow | AI Automation for Local Business',
  description: 'We replace manual admin with intelligent workflows. From lead capture to invoicing, Vivid Flow builds the digital infrastructure your local business needs to scale.',
  keywords: ['AI automation', 'local business', 'SME', 'workflow automation', 'UK business'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-stone-50">
        {children}
      </body>
    </html>
  )
}
