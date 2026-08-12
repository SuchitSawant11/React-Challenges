import { useState } from "react"
import { Task } from "./TaskList"
import Button from "./Button"
import FormInput from "./FormInput"

interface TaskFormProps {
  onAddTask?: (task: Task) => void
}

export default function TaskForm(_props: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low")
  const [error, setError] = useState("")
  const [category, setCategory] = useState("General")
  const [tags, setTags] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!title) {
      setError("Title is required")
      return
    }
    
      setError("")
      _props.onAddTask?.({ id: Date.now().toString(), title, description, priority, completed: false, category, tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag), dueDate: dueDate || undefined })
      setTitle("")
      setDescription("")
      setPriority("Low")
      setCategory("General")
      setTags("")
      setDueDate("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <FormInput id="task-title" label="task-title" value={title} onChange={(e) => setTitle(e.target.value)} type="text" />

      <label htmlFor="task-desc">Description</label>
      <FormInput id="task-desc" label="task-desc" value={description} onChange={(e) => setDescription(e.target.value)} type="textarea" />

      <label htmlFor="task-priority">Priority</label>
      <select id="task-priority" name="task-priority" value={priority} onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label htmlFor="task-category">Category</label>
      <select id="task-category" name="task-category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Dynamic">Dynamic</option>
      </select>

      <label htmlFor="task-tags">Tags</label>
      <input type="text" id="task-tags" name="task-tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Comma separated tags" />

      <label htmlFor="task-due-date">Due Date</label>
      <input type="date" id="task-due-date" name="task-due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <Button type="submit" children="Add Task" />

      {error && <p id="task-form-error" style={{ color: "red" }}>{error}</p>}
    </form>
  )
}
