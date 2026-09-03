// loadingTsx: The /posts route uses app/posts/loading.tsx as its automatic loading UI.
// Suspense: Next.js App Router supports Suspense boundaries for streaming synchronous UI.
// dynamicExport: Next.js route rendering can be controlled with a dynamic export.
// forceStaticOrDynamic: A route can use force-static or force-dynamic rendering.

import { Metadata } from "next"
import AddPostForm from "../components/AddPostForm"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Posts',
    description: 'A list of posts fetched from an external API.',
}

interface Post {
    id: number
    title: string
    body: string
}

async function getPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } })

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    return response.json()
}

export default async function PostsPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
    const posts = await getPosts()

    const query = searchParams.q?.toLowerCase() || ''
    const currentPage = Math.max(1, Number(searchParams.page) || 1)

    const filteredPosts = query ? posts.filter(post => post.title.toLowerCase().includes(query)) : posts

    const postsPerPage = 10
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    const safePage = Math.min(currentPage, Math.max(totalPages, 1))

    const startIndex = (safePage - 1) * postsPerPage
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

    return (
        <main>
            <h1>Posts</h1>

            <AddPostForm />

            {/* Search */}
            <form method="GET">
                <input
                    type="search"
                    name="q"
                    placeholder="Search posts..."
                    defaultValue={searchParams.q || ''}
                />

                <button type="submit">
                    Search
                </button>
            </form>

            {/* Results */}
            {paginatedPosts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul>
                    {paginatedPosts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <nav aria-label="Pagination">
                    {safePage > 1 && (
                        <Link href={`/posts?page=${safePage - 1}${query ? `&q=${encodeURIComponent(query)}` : ''}`}>
                            Previous
                        </Link>
                    )}

                    <span>
                        {' '} Page {safePage} of {totalPages}{' '}
                    </span>

                    {safePage < totalPages && (
                        <Link href={`/posts?page=${safePage + 1}${query ? `&q=${encodeURIComponent(query)}` : ''}`}>
                            Next
                        </Link>
                    )}
                </nav>
            )}
        </main>
    )
}