// src/pages/AddTeachernt.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTeacher = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const teacher = { name, email, password }
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/add-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(teacher),
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
    <div className="add-teacher container">
      <h2>Add New Teacher</h2>
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
          <button disabled>Adding Teacher...</button>
        ) : (
          <button>Add Teacher</button>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default AddTeacher
