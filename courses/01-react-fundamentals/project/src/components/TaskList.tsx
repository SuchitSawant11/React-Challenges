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
}

const hardcodedTasks: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "First hardcoded task",
    priority: "High",
    completed: false
  },

  {
    id: 2,
    title: "Task Two",
    description: "Second hardcoded task",
    priority: "Medium",
    completed: true
  },

  {
    id: 3,
    title: "Task Three",
    description: "Third hardcoded task",
    priority: "Low",
    completed: false
  }
]

export default function TaskList(_props: TaskListProps) {
  const list = _props.tasks ?? hardcodedTasks

  const completedCount = list.filter(task => task.completed).length || 0

  const totalTasks = list.length || 0

  return <section id="task-list" >
    <div id="task-count">
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
      />
    ))}
  </section>
}
