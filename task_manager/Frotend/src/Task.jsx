import React, { useState } from 'react'
import './Task.css'

const Task = ({ id, title, description, status, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDesc, setEditDesc] = useState(description)

  const handleSave = () => {
    if (!editTitle.trim()) return
    onUpdate(id, { title: editTitle, description: editDesc })
    setEditing(false)
  }

  const toggleStatus = () => {
    onUpdate(id, { status: status === 'pending' ? 'completed' : 'pending' })
  }

  return (
    <div className="task-card">
      <div className="task-card__header">
        {editing ? (
          <input
            className="task-card__input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <h1>{title}</h1>
        )}
        <span
          className={`task-card__status task-card__status--${status}`}
          title="Click to toggle status"
          onClick={toggleStatus}
          style={{ cursor: 'pointer' }}
        >
          {status}
        </span>
      </div>

      {editing ? (
        <input
          className="task-card__input"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
      ) : (
        <p>{description}</p>
      )}

      <div className="task-card__actions">
        <button
          className={`task-card__toggle task-card__toggle--${status === 'pending' ? 'complete' : 'pending'}`}
          onClick={toggleStatus}
        >
          {status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        {editing ? (
          <>
            <button className="task-card__update" onClick={handleSave}>Save</button>
            <button className="task-card__cancel" onClick={() => { setEditing(false); setEditTitle(title); setEditDesc(description) }}>Cancel</button>
          </>
        ) : (
          <button className="task-card__update" onClick={() => setEditing(true)}>Update</button>
        )}
        <button className="task-card__delete" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  )
}

export default Task
