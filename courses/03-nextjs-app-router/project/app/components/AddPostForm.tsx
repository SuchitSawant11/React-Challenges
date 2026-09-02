'use client'

// useServer: This file contains Server Actions and runs on the server.
// revalidatePath: Revalidates the /posts route after a mutation.
// revalidateTag: Next.js also supports cache revalidation using tags.

import { useState } from 'react'
import { addPost } from '../actions'

export default function AddPostForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    try {
      await addPost(formData)
      setMessage('Post added successfully!')
    } catch {
      setMessage('Failed to add post.')
    }
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          required
        />
      </div>

      <button type="submit">Add Post</button>

      {message && <p>{message}</p>}
    </form>
  )
}