interface Post {
  id: number
  title: string
  body: string
}

// dynamicSegment: The [id] folder creates a dynamic route segment.

async function getPostById(id: number): Promise<Post> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch post')
    }
    return response.json()
}

export default async function PostPage(params: { id: string }) {
    const id = Number(params.id)
    try {
        const post = await getPostById(id)
        return (
            <main>
                <h1>Post {post.id}</h1>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </main>
        )
    } catch (error) {
        return (
            <main>
                <h1>Post not found</h1>
            </main>
        )
    }
}
