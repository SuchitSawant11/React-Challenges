import { useGetPostByIdQuery } from "../api/apiSlice"
import ErrorDisplay from "./ErrorDisplay"

/** Stub: Complete Challenge 13 (Query with Parameters) per README. */
interface PostDetailProps {
  postId?: number
}
export default function PostDetail(props: PostDetailProps) {
  const { data, isLoading, isError, error } = useGetPostByIdQuery(props.postId ?? 0, { skip: !props.postId })

  if (!props.postId) return <div data-testid="post-detail">Please provide a post ID.</div>

  if (isLoading) return <div data-testid="post-detail-loading">Loading posts...</div>

  if (isError) return <ErrorDisplay error={error} />

  if (!data) return <div data-testid="post-detail-error">Post not found.</div>

  return <div data-testid="post-detail">
    <h2>{data.title}</h2>
    <p>{data.body}</p>
    <p>User ID: {data.userId}</p>
  </div>
}
