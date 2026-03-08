import { useState } from 'react'


export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!title.trim()) {
      setError('Task title cannot be empty')
      return
    }

    // Call parent handler with task data
    onAddTask({
      title: title.trim(),
      priority
    })

    // Reset form
    setTitle('')
    setPriority('medium')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setError('')
          }}
          className="task-input"
        />
      </div>

      <div className="form-group">
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="add-button">Add Task</button>

      {error && <p className="error">{error}</p>}
    </form>
  )
}
