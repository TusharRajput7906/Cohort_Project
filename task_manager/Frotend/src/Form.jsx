import React, { useState } from 'react'
import './Form.css'

const Form = ({ addTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Submit</button>
    </form>
  )
}

export default Form
