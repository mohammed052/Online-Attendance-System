// src/pages/AddStudent.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const student = { name, email, password }
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(student),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setIsLoading(false)
      navigate('/admin')
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Enter Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Enter Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <button disabled>Adding Student...</button>
        ) : (
          <button>Add Student</button>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default AddStudent