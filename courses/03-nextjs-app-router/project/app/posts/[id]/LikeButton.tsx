'use client'

import { useState } from 'react'

// Client Component for interactive post functionality.

export default function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setLiked((current) => !current)}
    >
      {liked ? 'Unlike ❤️' : 'Like 🤍'}
    </button>
  )
}