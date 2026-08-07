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

  return (
    <>
      <div id="task-count">
        {_props.tasks?.length || 0} Tasks
      </div>

      {_props.showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}
      <TaskList tasks={_props.tasks} />
    </>
  )
}
