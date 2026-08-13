import React, { useState } from "react"
import { Link } from 'react-router-dom'
import Button from "./Button"
import Badge from "./Badge"
import StatusIndicator from "./StatusIndicator"

interface TaskCardProps {
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  completed?: boolean
  category?: string
  tags?: string[]
  onToggle?: (id: string | number) => void
  taskId?: string | number
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: "Low" | "Medium" | "High"
      dueDate?: string | number
    }
  ) => void
  editing?: boolean
  onEdit?: (id: string | number) => void
  onCancelEdit?: () => void
  dueDate?: string | number
  linkToTaskDetail?: boolean
}

function TaskCard(_props: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(_props.title)
  const [editDescription, setEditDescription] = useState(_props.description)
  const [editPriority, setEditPriority] = useState(_props.priority)
  const [editDueDate, setEditDueDate] = useState(_props.dueDate || "")

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
      priority: editPriority,
      dueDate: editDueDate || undefined
    })
  }

  const handleCancel = () => {
    setEditTitle(_props.title)
    setEditDescription(_props.description)
    setEditPriority(_props.priority)
    setEditDueDate(_props.dueDate || "")

    _props.onCancelEdit?.()
  }

  const getDueStatus = () => {
    if (!_props.dueDate || _props.completed) {
      return null
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const due = new Date(_props.dueDate)
    due.setHours(0, 0, 0, 0)

    const diffInDays =
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

    if (diffInDays < 0) {
      return "Overdue"
    }

    if (diffInDays === 0) {
      return "Due Today"
    }

    if (diffInDays <= 3) {
      return "Due Soon"
    }

    return null
  }

  const dueStatus = getDueStatus()

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

          <Badge children="Priority" />
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

          <label>
            Due Date:
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </label>

          <Button
            onClick={handleSave}
            type="button"
            children="Save"
          />
          <Button
            onClick={handleCancel}
            type="button"
            children="Cancel"
          />
        </>
      ) : (
        <>
          <h2 style={{
            textDecoration: _props.completed ? "line-through" : "none"
          }}>
            {_props.linkToTaskDetail ? (
              <Link to={`/challenge/21-react-router/task/${_props.taskId}`}>
                {_props.title}
              </Link>) : (_props.title)}
          </h2>

          <p style={{
            textDecoration: _props.completed ? "line-through" : "none"
          }}>{_props.description}</p>

          <p><Badge children="Priority" /> {_props.priority}</p>

          <p id="task-category">
            <Badge children="Category" /> {_props.category}
          </p>

          {_props.tags && (
            <div id="task-tags">
              <Badge children="Tags" />
              {_props.tags?.map((tag) => (
                <span key={tag} data-tag={tag}>
                  {tag},
                </span>
              ))}
            </div>)}

          {_props.dueDate && (
            <p id="task-due-date">
              Due: {new Date(_props.dueDate).toLocaleDateString()}
            </p>
          )}

          {dueStatus && (
            <span data-overdue={dueStatus === "Overdue" ? "true" : "false"}>
              <StatusIndicator status={dueStatus} />
            </span>
          )}

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
            <Button
              onClick={handleDelete}
              type="button"
              children="Delete" />
          )}

          {!_props.editing && (
            <Button
              onClick={() => _props.onEdit?.(_props.taskId ?? "")}
              type="button"
              children="Edit"
            />
          )}
        </>
      )}
    </article>
  )
}

export default React.memo(TaskCard)