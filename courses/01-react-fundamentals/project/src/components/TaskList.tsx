import TaskCard from "./TaskCard"

export interface Task {
  id: string | number
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: "Low" | "Medium" | "High"
      dueDate?: string | number
    }
  ) => void
  editingId?: string | number | null
  onEdit?: (id: string | number) => void
  onCancelEdit?: () => void
}

const hardcodedTasks: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "First hardcoded task",
    priority: "High",
    completed: false,
    category: "work",
    tags: ["urgent", "office"]
  },

  {
    id: 2,
    title: "Task Two",
    description: "Second hardcoded task",
    priority: "Medium",
    completed: true,
    category: "General",
    tags: ["important", "meeting"]
  },

  {
    id: 3,
    title: "Task Three",
    description: "Third hardcoded task",
    priority: "Low",
    completed: false,
    category: "Personal",
    tags: ["routine", "office"]
  }
]

export default function TaskList(_props: TaskListProps) {
  const list = _props.tasks ?? hardcodedTasks

  const completedCount = list.filter(task => task.completed).length || 0

  const totalTasks = list.length || 0

  return <section id="task-list" >
    <div id="completed-task-count">
      {_props.countText ??
        `${completedCount} of ${totalTasks} completed`}
    </div>

    {list.map((t) => (
      <TaskCard
        key={t.id}
        title={t.title}
        description={t.description}
        priority={t.priority}
        completed={t.completed}
        onToggle={_props.onToggle}
        taskId={t.id}
        onDelete={_props.onDelete}
        onUpdateTask={_props.onUpdateTask}
        editing={_props.editingId === t.id}
        onEdit={_props.onEdit}
        onCancelEdit={_props.onCancelEdit}
        category={t.category}
        tags={t.tags}
        dueDate={t.dueDate}
      />
    ))}
  </section>
}
