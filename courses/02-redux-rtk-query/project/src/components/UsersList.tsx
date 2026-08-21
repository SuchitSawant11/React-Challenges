import { useGetUsersQuery } from "../api/apiSlice"

/** Stub: Complete Challenge 07 (Queries) per README. */
export default function UsersList() {
  const useQueryHook = useGetUsersQuery
  const { data, isLoading, error } = useQueryHook()

  if (isLoading) {
    return <p data-testid="users-loading">Loading...</p>
  }

  if (error) {
    return <p data-testid="users-error">Failed to load users.</p>
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
