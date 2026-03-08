
const API_BASE_URL = 'http://localhost:5000'


// Get all tasks
export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`)
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return response.json()
}

// Create new task
export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create task')
  }
  return response.json()
}

// Update task
export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  
  if (!response.ok) {
    throw new Error('Failed to update task')
  }
  return response.json()
}

// Delete task
export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
  return response.json()
}
