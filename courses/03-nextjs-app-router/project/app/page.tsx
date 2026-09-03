import Link from 'next/link'
import ChallengeList from './components/ChallengeList'
import Counter from './components/Counter'
import { Metadata } from 'next'
import Image from 'next/image'

// serverComponent: This page is a Server Component.
// useClient: Intentionally not used here; interactivity is isolated in Counter.
// useState: Intentionally not used here; state is handled by the Client Component.
// appDirectory: This page is inside the Next.js app directory.
// fileBasedRouting: app/page.tsx maps to the "/" route.
// nextImage: next/image is Next.js's optimized image component. It provides features such as image optimization, sizing, and efficient image loading.
// nextFont: next/font is Next.js's built-in font optimization system. It allows us to load fonts such as Inter and apply them directly to the application.

export const metadata: Metadata = {
  title: 'Next.js App Router Project',
  description: 'Complete the challenges to build your Next.js skills!',
}

export default function Home() {
  return (
    <main>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Next.js App Router Project</h1>
        <p>Complete the challenges to build your Next.js skills!</p>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Work on challenges by modifying code in <code>app/</code> directory.
          Run <code>npm run dev</code> to see your changes.
        </p>

        <Link href="/about" className="text-blue-500 hover:underline">
          About
        </Link>

        <Counter />
      </header>

      <Image
        src="/nextjs-logo.png"
        alt="Next.js Logo"
        width={600}
        height={400}
      />

      <ChallengeList />
    </main>
  )
}
