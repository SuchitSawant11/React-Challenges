import { useGetUsersQuery } from "../api/apiSlice"
import ErrorDisplay from "./ErrorDisplay"

/** Stub: Complete Challenge 07 (Queries) per README. */
export default function UsersList() {
  const useQueryHook = useGetUsersQuery
  const { data, isLoading, isError, error, refetch } = useQueryHook()

  if (isLoading) {
    return <p data-testid="users-loading">Loading...</p>
  }

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch}/>
  }

  return <div data-testid="users-list">
    {data?.map((user) => (
      <div key={user.id}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.username}</p>
      </div>
    ))}
  </div>
}
