import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Vivid Flow',
  description: 'Take our free 2-minute quiz to assess your business automation readiness and get personalised recommendations.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
