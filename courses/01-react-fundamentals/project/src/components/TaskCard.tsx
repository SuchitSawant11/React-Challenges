interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
  onDelete?: (id: string | number) => void
}

export default function TaskCard(_props: TaskCardProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      _props.onDelete?.(_props.taskId ?? "")
    }
  }

  return (
    <article id="task-card" data-completed={_props.completed}>

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

    </article>
  )
}
