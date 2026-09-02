interface Post {
    id: number
    title: string
    body: string
}

async function getPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    return response.json()
}

export default async function PostsPage() {
    try {
        const posts = await getPosts()

        return (
            <main>
                <h1>Posts</h1>

                {posts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        )
    } catch {
        return (
            <main>
                <h1>Posts</h1>
                <p>Failed to load posts.</p>
            </main>
        )
    }
}