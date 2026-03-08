import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks, createTask, updateTask, deleteTask } from './api'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData)
      setTasks(prevTasks => [...prevTasks, newTask])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id)
      if (!task) {
        setError('Task not found')
        return
      }
      
      const updatedTask = await updateTask(id, { completed: !task.completed })
      setTasks(tasks.map(t => t.id === id ? updatedTask : t))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      
      {error && <div className="error-banner">{error}</div>}
      
      <TaskForm onAddTask={handleAddTask} />
      
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TaskList 
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  )
}

export default App
