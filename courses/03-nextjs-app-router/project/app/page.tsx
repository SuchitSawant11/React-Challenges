import Link from 'next/link'
import ChallengeList from './components/ChallengeList'

// serverComponent: This page is a Server Component by default.
// fileBasedRouting: app/page.tsx maps to the "/" route.
// appDirectory: This page is part of the Next.js App Router.

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
      </header>
      <ChallengeList />
    </main>
  )
}
