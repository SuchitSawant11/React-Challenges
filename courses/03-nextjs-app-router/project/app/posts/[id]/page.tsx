import { notFound } from "next/navigation"

// dynamicSegment: The [id] folder creates a dynamic route segment.
// errorTsx: error.tsx is a special Next.js App Router file that acts as an error boundary for a route segment and displays a fallback UI when an unexpected error occurs.

interface Post {
    id: number
    title: string
    body: string
}

async function getPostById(id: number): Promise<Post | null> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error('Failed to fetch post')
    }
    return response.json()
}

export default async function PostPage(params: { id: string }) {
    const id = Number(params.id)

    const post = await getPostById(id)

    if (!post) {
        notFound()
    }

    return (
        <main>
            <h1>Post {post.id}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </main>
    )
}
