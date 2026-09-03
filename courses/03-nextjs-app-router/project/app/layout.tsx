import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] })

// serverComponent: Root layouts are Server Components by default.
// fileBasedRouting: The layout belongs to the App Router file structure.
// appDirectory: This layout is inside the Next.js app directory.
// Link: Link is used for client-side navigation between pages in the Next.js app.
// nextImage: next/image is Next.js's optimized image component. It provides features such as image optimization, sizing, and efficient image loading.
// nextFont: next/font is Next.js's built-in font optimization system. It allows us to load fonts such as Inter and apply them directly to the application.

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
