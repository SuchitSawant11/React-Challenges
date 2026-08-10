import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import { useState } from 'react'
import FilterBar from './FilterBar'

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
  //Filter
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const tasks = _props.tasks ?? []

  const filteredTasks = filter === 'all' ? tasks : filter === 'active' ? tasks.filter(task => !task.completed) : tasks.filter(task => task.completed)

  //Search
  const [search, setSearch] = useState('')

  const searchedTasks = filteredTasks.filter(task => {
    const searchText = search.toLowerCase()

    return (
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText)
    )
  })

  //Sort
  const [sortOrder, setSortOrder] = useState<'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical'>('recent')
  
  const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortOrder === 'recent') {
      return 0
    }

    if (sortOrder === 'highToLow') {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }

    if (sortOrder === 'lowToHigh') {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }

    if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title, undefined, {
        sensitivity: 'base'
      })
    }

    return 0
  })

  const [editingId, setEditingId] = useState<string | number | null>(null)

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

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: "Low" | "Medium" | "High"
    }
  ) => {
    if (_props.setTasks) {
      _props.setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, ...updates }
            : task
        )
      )
    }

    setEditingId(null)
  }

  return (
    <>
      {_props.showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      {_props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          search={search}
          onSearchChange={setSearch}
        />
      )}

      <div id="task-count">
        Showing {searchedTasks.length} of {tasks.length} tasks
      </div>

      {searchedTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks found
        </p>
      )}

      <TaskList
        tasks={sortedTasks}
        onToggle={handleToggleTask}
        onDelete={_props.onDelete}
        onUpdateTask={handleUpdateTask}
        editingId={editingId}
        onEdit={setEditingId}
        onCancelEdit={() => setEditingId(null)}
      />
    </>
  )
}
