'use client'

import { useGetPostsQuery } from '../store/apiSlice'

export default function PostsList() {
    const { data, isLoading, isError } = useGetPostsQuery()

    if (isLoading) {
        return <p>Loading posts...</p>
    }

    if (isError) {
        return <p>Failed to load posts.</p>
    }

    return (
        <section>
            <h2>Posts from RTK Query</h2>

            {data && data.length > 0 ? (
                <ul>
                    {data.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}
        </section>
    )
}