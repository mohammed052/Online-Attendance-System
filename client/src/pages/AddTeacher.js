import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTeacher = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const teacher = { name, email, password }
    setIsLoading(true)

    fetch('/api/admin/add-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher),
    }).then(() => {
      console.log('New teacher added')
      setIsLoading(false)
      navigate('/admin')
    })
  }

  return (
    <div className="add-teacher container">
      <h2>Add New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Name</label>
        <input
          type="text"
          className="input"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Enter Email</label>
        <input
          type="email"
          className="input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Enter Password</label>
        <input
          type="password"
          className="input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading && (
          <button className="button" disabled>
            Adding New Teacher..
          </button>
        )}
        {!isLoading && <button className="button">Add Teacher</button>}
      </form>
    </div>
  )
}

export default AddTeacher