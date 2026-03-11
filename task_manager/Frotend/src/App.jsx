import React, { useState, useEffect } from 'react'
import Form from "./Form"
import Task from './Task'
import './App.css'
import api from './utils/api'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/task')
      .then((res) => setTasks(res.data.tasks))
      .catch(() => setError('Failed to load tasks.'))
      .finally(() => setLoading(false))
  }, [])

  const addTask = async (title, description) => {
    setError('')
    try {
      const res = await api.post('/task', { title, description })
      setTasks((prev) => [res.data.task, ...prev])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task. Is the backend running?')
    }
  }

  const updateTask = async (id, data) => {
    setError('')
    try {
      const res = await api.put(`/task/${id}`, data)
      setTasks((prev) => prev.map((t) => t._id === id ? res.data.task : t))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task.')
    }
  }

  const deleteTask = async (id) => {
    setError('')
    try {
      await api.delete(`/task/${id}`)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task.')
    }
  }

  return (
    <div className="app-container">
      <Form addTask={addTask} />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
