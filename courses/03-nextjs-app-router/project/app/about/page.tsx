import Link from "next/link";
import PostsPage from "../posts/page";
import type { Metadata } from "next";

// serverComponent: This page is a Server Component by default.
// fileBasedRouting: app/about/page.tsx maps to the "/about" route.
// appDirectory: This page belongs to the Next.js App Router.

export const metadata: Metadata = {
    title: 'About',
    description: 'This is the About page of the Next.js App Router project.',
}

export default function AboutPage() {
    return (
        <>
            <Link href="/" className="text-blue-500 hover:underline">
                Home
            </Link>

            <PostsPage />
        </>
    )
}