import { useState } from "react"

interface TaskCardProps {
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: "Low" | "Medium" | "High"
    }
  ) => void
  editing?: boolean
  onEdit?: (id: string | number) => void
  onCancelEdit?: () => void
}

export default function TaskCard(_props: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(_props.title)
  const [editDescription, setEditDescription] = useState(_props.description)
  const [editPriority, setEditPriority] = useState(_props.priority)

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      _props.onDelete?.(_props.taskId ?? "")
    }
  }

  const handleSave = () => {
    if (!editTitle.trim()) {
      return
    }

    _props.onUpdateTask?.(_props.taskId ?? "", {
      title: editTitle,
      description: editDescription,
      priority: editPriority
    })
  }

  const handleCancel = () => {
    setEditTitle(_props.title)
    setEditDescription(_props.description)
    setEditPriority(_props.priority)

    _props.onCancelEdit?.()
  }

  return (
    <article id="task-card" data-completed={_props.completed}>
      {_props.editing ? (
        <>
          <label>
            Title:
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </label>

          <label>
            Description:
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </label>

          <label>
            Priority:
            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(
                  e.target.value as "Low" | "Medium" | "High"
                )
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h2 style={{
            textDecoration: _props.completed ? "line-through" : "none"
          }}>{_props.title}</h2>

          <p style={{
            textDecoration: _props.completed ? "line-through" : "none"
          }}>{_props.description}</p>

          <p>Priority: {_props.priority}</p>

          {_props.onToggle && (
            <label>Completed:
              <input
                type="checkbox"
                checked={_props.completed}
                onChange={() => _props.onToggle?.(_props.taskId ?? "")}
              />
            </label>
          )}

          {_props.onDelete && (
            <button onClick={handleDelete}>Delete</button>
          )}

          {!_props.editing && (
            <button onClick={() => _props.onEdit?.(_props.taskId ?? "")}>
              Edit
            </button>
          )}
        </>
      )}
    </article>
  )
}
