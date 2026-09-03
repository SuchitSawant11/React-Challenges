'use client'

// useServer: This file contains Server Actions and runs on the server.
// revalidatePath: Revalidates the /posts route after a mutation.
// revalidateTag: Next.js also supports cache revalidation using tags.

import { addPost } from '../actions'

export default function AddPostForm() {

  return (
    <form action={addPost}>
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
    </form>
  )
}