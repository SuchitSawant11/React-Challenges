'use server'

// useServer: This file contains Server Actions and runs on the server.
// revalidatePath: Revalidates the /posts route after a mutation.
// revalidateTag: Next.js also supports cache revalidation using tags.

import { revalidatePath } from 'next/cache'

interface PostData {
  title: string
  body: string
}

export async function addPost(formData: FormData) {
  const title = formData.get('title')
  const body = formData.get('body')

  if (typeof title !== 'string' || typeof body !== 'string') {
    throw new Error('Invalid post data')
  }

  const postData: PostData = {
    title,
    body,
  }

  // Simulate a server-side mutation.
  // In a real application, this would save postData to a database.

  if (!postData.title || !postData.body) {
    throw new Error('Title and body are required')
  }

  revalidatePath('/posts')
}