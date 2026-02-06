import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI Calculator | Vivid Flow',
  description: 'Calculate how much time and money AI automation could save your business. Free tool for UK SMEs.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
