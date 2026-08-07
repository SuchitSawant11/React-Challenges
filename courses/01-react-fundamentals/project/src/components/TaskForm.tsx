import { useState } from "react"
import { Task } from "./TaskList"

interface TaskFormProps {
  onAddTask?: (task: Task) => void
}

export default function TaskForm(_props: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Low")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!title) {
      setError("Title is required")
      return
    }
    
      setError("")
      _props.onAddTask?.({ id: Date.now().toString(), title, description, priority, completed: false })
      setTitle("")
      setDescription("")
      setPriority("Low")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <input type="text" id="task-title" name="task-title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="task-desc">Description</label>
      <textarea id="task-desc" name="task-desc" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label htmlFor="task-priority">Priority</label>
      <select id="task-priority" name="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Add Task</button>

      {error && <p id="task-form-error" style={{ color: "red" }}>{error}</p>}
    </form>
  )
}
