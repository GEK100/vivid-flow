import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Opportunity Assessment | Vivid Flow',
  description: 'Take our free 2-minute assessment to discover your AI automation opportunity and get personalised recommendations.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
