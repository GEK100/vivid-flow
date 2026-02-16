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
  title: 'How Can AI Automation Help UK Small Businesses? | Vivid Flow',
  description: 'AI automation helps UK SMEs save time on admin tasks like answering calls, invoicing, and data entry. Vivid Flow builds intelligent workflows for trades, professional services, and hospitality businesses.',
  keywords: ['AI automation', 'UK small business', 'SME automation', 'workflow automation', 'AI for trades', 'AI for professional services'],
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
