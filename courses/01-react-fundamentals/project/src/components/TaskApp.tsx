import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp(_props: TaskAppProps) {
  const handleAddTask = (task: Task) => {
    if (_props.setTasks) {
      _props.setTasks((prev) => [...prev, task])
    }
  }

  const handleToggleTask = (id: string | number) => {
    if (_props.setTasks) {
      _props.setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t))
    }
  }

  return (
    <>
      {_props.showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={_props.tasks}
        onToggle={handleToggleTask}
        onDelete={_props.onDelete}
      />
    </>
  )
}
