import { useGetPostsQuery } from "../api/apiSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useMemo } from "react"
import { setSortBy } from "../store/slices/filtersSlice"

/** Stub: Complete Challenge 11 (API and Local State) per README. */
export default function PostsWithFilters() {
  const { data: post = [], isLoading, isError } = useGetPostsQuery()
  const sortBy = useAppSelector(state => state.filters.sortBy)
  const dispatch = useAppDispatch()

  const sortedPosts = useMemo(() => {
    const result = [...post]

    if (sortBy === 'newest') {
      return result.sort((a, b) => b.id - a.id)
    }

    if (sortBy === 'oldest') {
      return result.sort((a, b) => a.id - b.id)
    }

    if (sortBy === 'alphabetical') {
      return result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [post, sortBy])

  if (isLoading) return <div>Loading</div>

  if (isError) return <div>Error loading posts.</div>


  return <div data-testid="posts-with-filters">
    <div data-testid="filter-controls">
      <label>Sort by: </label>
      <select id="sort-by" value={sortBy} onChange={e => dispatch(setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical'))}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>

    <ul>
      {sortedPosts.map(post => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  </div>
}
