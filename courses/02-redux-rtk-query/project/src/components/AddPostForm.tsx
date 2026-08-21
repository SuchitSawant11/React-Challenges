import { FormEvent, useState } from "react"
import { useCreatePostMutation } from "../api/apiSlice"

/** Stub: Complete Challenge 09 (Mutations) per README. */
export default function AddPostForm() {
  const [userId, setUserId] = useState(1)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const [creatPost, { isLoading, isSuccess, isError }] = useCreatePostMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim() || !body.trim()) return

    await creatPost({
      userId,
      title: title.trim(),
      body: body.trim()
    })

    setTitle("")
    setBody("")
  }

  return <div id="add-post-form">
    <form
      data-testid="add-post-form"
      onSubmit={handleSubmit}
    >
      <label>
        User ID
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </label>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
      </label>

      <label>
        Body
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body"
        />
      </label>

      <button
        type="submit"
        data-testid="add-post-submit"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Post"}
      </button>
    </form>

    {isSuccess && <p>Post added successfully!</p>}

    {isError && <p>Failed to add post.</p>}
  </div>
}
