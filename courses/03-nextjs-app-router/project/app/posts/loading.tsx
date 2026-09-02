// loadingTsx: This special loading.tsx file provides the loading UI for the /posts route segment.
// Suspense: Next.js App Router supports Suspense boundaries for streaming synchronous UI.

export default function Loading() {
  return (
    <main>
      <h1>Posts</h1>
      <p>Loading posts...</p>
    </main>
  )
}