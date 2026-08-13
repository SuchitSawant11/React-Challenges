import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import { useState, useEffect, useMemo, useCallback } from 'react'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'
import Button from './Button'
import { TaskAction } from '../reducers/taskReducer'
import ErrorBoundary from './ErrorBoundary'

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

const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }

const EMPTY_TASKS: Task[] = []

export default function TaskApp(_props: TaskAppProps) {
  const tasks = _props.tasks ?? EMPTY_TASKS
  const dispatch = _props.dispatch

  //Theme state and toggle function from ThemeContext
  const { theme, toggleTheme } = useTheme()

  //Status Filter state
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  //Category Filter state
  const [categoryFilter, setCategoryFilter] = useState("all")

  //Search + Debounce state
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

  //Sort Order state
  const [sortOrder, setSortOrder] = useState<'recent' | 'highToLow' | 'lowToHigh' | 'alphabetical' | 'dueDate'>('recent')

  //Statistics calculation
  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(task => task.completed).length

    const active = tasks.filter(task => !task.completed).length

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

    const completedPercentage = total > 0 ? (completed / total) * 100 : 0

    return { total, completed, active, overdue, completedPercentage }

  }, [tasks])


  //Categories
  const categories = useMemo(() => {
    return [
      ...new Set(
        tasks.map(task => task.category).filter((category): category is string => Boolean(category))
      )
    ]
  }, [tasks])

  // Editing state
  const [editingId, setEditingId] = useState<string | number | null>(null)

  const displayedTasks = useMemo(() => {
    // 1. Status filter
    let result =
      filter === 'all' ? [...tasks] : filter === 'active' ? tasks.filter(task => !task.completed) : tasks.filter(task => task.completed)

    // 2. Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(task => task.category === categoryFilter)
    }

    // 3. Search
    const searchText = debouncedSearch.trim().toLowerCase()

    if (searchText) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText)
      )
    }

    // 4. Sort
    result.sort((a, b) => {
      if (sortOrder === 'recent') {
        return 0
      }

      if (sortOrder === 'highToLow') {
        return (priorityOrder[b.priority] - priorityOrder[a.priority])
      }

      if (sortOrder === 'lowToHigh') {
        return (priorityOrder[a.priority] - priorityOrder[b.priority])
      }

      if (sortOrder === 'alphabetical') {
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      }

      if (sortOrder === 'dueDate') {
        if (!a.dueDate && !b.dueDate) {
          return 0
        }

        if (!a.dueDate) {
          return 1
        }

        if (!b.dueDate) {
          return -1
        }

        return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      }

      return 0
    })

    return result
  }, [tasks, filter, categoryFilter, debouncedSearch, sortOrder])

  const handleAddTask = useCallback((task: Task) => {
    if (dispatch) {
      dispatch({ type: 'ADD_TASK', payload: task })
    }
  }, [dispatch])

  const handleToggleTask = useCallback((id: string | number) => {
    if (dispatch) {
      dispatch({ type: 'TOGGLE_TASK', payload: id })
    }
  }, [dispatch])

  const handleUpdateTask = useCallback(
    (id: string | number,
      updates: {
        title: string
        description: string
        priority: "Low" | "Medium" | "High"
        dueDate?: string | number
      }
    ) => {
      if (dispatch) {
        dispatch({ type: 'UPDATE_TASK', payload: { id, ...updates } })
      }
    }, [dispatch])

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
        Showing {displayedTasks.length} of {tasks.length} tasks
      </div>

      {search !== debouncedSearch && (
        <p id="searching-indicator">Searching...</p>
      )}

      {displayedTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks found
        </p>
      )}

      <ErrorBoundary>
        <TaskList
          tasks={displayedTasks}
          onToggle={handleToggleTask}
          onDelete={_props.onDelete}
          onUpdateTask={handleUpdateTask}
          editingId={editingId}
          onEdit={setEditingId}
          onCancelEdit={() => setEditingId(null)}
          linkToTaskDetail={_props.linkToTaskDetail}
        />
      </ErrorBoundary>

    </>
  )
}
