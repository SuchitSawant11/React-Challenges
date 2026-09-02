import type { NextRequest } from 'next/server'

// routeHandler: This file defines a Next.js App Router Route Handler.
// ResponseJson: Response.json() is used to return JSON responses.

interface Post {
  id: number
  title: string
  body: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the first post.',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the second post.',
  },
]

export async function GET() {
  return Response.json(posts)
}

export async function POST(request: NextRequest) {
  const body: Omit<Post, 'id'> = await request.json()

  const newPost: Post = {
    id: posts.length + 1,
    title: body.title,
    body: body.body,
  }

  return Response.json(newPost, { status: 201 })
}