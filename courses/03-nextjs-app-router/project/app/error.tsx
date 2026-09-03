'use client'

// errorTsx: error.tsx is a special Next.js App Router file that acts as an error boundary for a route segment and displays a fallback UI when an unexpected error occurs.
// notFound: notFound() is a Next.js function used when a requested resource doesn't exist. It stops rendering the current page and causes Next.js to show the appropriate 404 UI.

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}