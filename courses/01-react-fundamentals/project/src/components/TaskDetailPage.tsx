import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Task } from './TaskList'
import Button from "./Button"

export default function TaskDetailPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [tasks] = useLocalStorage<Task[]>('task-app-tasks', [])

  const task = tasks.find(item => String(item.id) === String(id))

  if (!task) {
    return (
      <div id="task-detail-page">
        <h2>Task not found</h2>

        <Button
          id="task-detail-back"
          type="button"
          onClick={() => navigate('/challenge/21-react-router')}
          children="Back to list"
        />
      </div>
    )
  }

  return (
    <div id="task-detail-page">
      <Button
        id="task-detail-back"
        type="button"
        onClick={() => navigate('/challenge/21-react-router')}
        children="Back to list"
      />

      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>
        Priority: {task.priority}
      </p>

      <p>
        Status:{' '}
        {task.completed ? 'Completed' : 'Active'}
      </p>

      {task.category && (
        <p>
          Category: {task.category}
        </p>
      )}

      {task.tags &&
        task.tags.length > 0 && (
          <div>
            Tags:{' '}
            {task.tags.join(', ')}
          </div>
        )}

      {task.dueDate && (
        <p>
          Due Date:{' '}
          {new Date(
            task.dueDate
          ).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

