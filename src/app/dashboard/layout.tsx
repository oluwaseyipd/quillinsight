import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QuillInsight - Dashboard',
  description: 'AI-Powered Note Taking Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-app text-text-app">
      {children}
    </div>
  )
}
