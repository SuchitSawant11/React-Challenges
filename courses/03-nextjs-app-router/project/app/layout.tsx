import type { Metadata } from 'next'
import './globals.css'

// serverComponent: Root layouts are Server Components by default.
// fileBasedRouting: The layout belongs to the App Router file structure.
// appDirectory: This layout is inside the Next.js app directory.
// Link: Link is used for client-side navigation between pages in the Next.js app.

export const metadata: Metadata = {
  title: 'Next.js App Router Project',
  description: 'Complete challenges to build your Next.js skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
