import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import { useState, useEffect, useMemo } from 'react'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'
import Button from './Button'
import { TaskAction } from '../reducers/taskReducer'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: TaskAction) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp(_props: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  //Filter
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const tasks = _props.tasks ?? []

  const stats = useMemo(() => {

    const total = tasks.length

    const completed = tasks.filter(
      task => task.completed
    ).length

    const active = tasks.filter(
      task => !task.completed
    ).length

    const overdue = tasks.filter(task => {
      if (!task.dueDate || task.completed) {
        return false
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      return dueDate.getTime() < today.getTime()
    }).length

    const completedPercentage =
      total > 0 ? (completed / total) * 100 : 0

    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage
    }
  }, [tasks])


  const filteredTasks = filter === 'all' ? tasks : filter === 'active' ? tasks.filter(task => !task.completed) : tasks.filter(task => task.completed)

  //Category filter
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = [
    ...new Set(
      tasks
        .map(task => task.category)
        .filter((category): category is string => Boolean(category))
    )
  ]

  const categoryFilteredTasks = categoryFilter === "all" ? filteredTasks : filteredTasks.filter(task => task.category === categoryFilter)

  //Search + Debounced search
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  const searchedTasks = categoryFilteredTasks.filter(task => {
    const searchText = debouncedSearch.toLowerCase()

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

    if (sortOrder === "dueDate") {
      if (!a.dueDate && !b.dueDate) {
        return 0
      }

      if (!a.dueDate) {
        return 1
      }

      if (!b.dueDate) {
        return -1
      }

      return (
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    }

    return 0
  })

  const [editingId, setEditingId] = useState<string | number | null>(null)

  const handleAddTask = (task: Task) => {
    if (_props.dispatch) {
      _props.dispatch({ type: 'ADD_TASK', payload: task })
    }
  }

  const handleToggleTask = (id: string | number) => {
    if (_props.dispatch) {
      _props.dispatch({ type: 'TOGGLE_TASK', payload: id })
    }
  }

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: "Low" | "Medium" | "High"
      dueDate?: string | number
    }
  ) => {
    if (_props.dispatch) {
      _props.dispatch({ type: 'UPDATE_TASK', payload: { id, ...updates } })
    }
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
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />
      )}

      <Button
        id="toggle-theme"
        type="button"
        children={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        onClick={toggleTheme} />

      {_props.showStatsPanel && (
        <StatsPanel
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
          completedPercentage={stats.completedPercentage}
        />
      )}

      <div id="task-count">
        Showing {searchedTasks.length} of {tasks.length} tasks
      </div>

      {search !== debouncedSearch && (
        <p id="searching-indicator">Searching...</p>
      )}

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
