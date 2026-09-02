import Link from "next/link";

// serverComponent: This page is a Server Component by default.
// fileBasedRouting: app/about/page.tsx maps to the "/about" route.
// appDirectory: This page belongs to the Next.js App Router.

export default function AboutPage() {
    return (
        <Link href="/" className="text-blue-500 hover:underline">
            Home
        </Link>
    )
}