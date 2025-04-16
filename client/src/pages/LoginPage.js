import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [inputs, setInputs] = useState({
    role: 'student',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      login(data.token, data) // Save to context + localStorage

      // Redirect based on role
      if (data.role === 'admin') navigate('/admin')
      else if (data.role === 'teacher') navigate('/teacher')
      else navigate('/student')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="form-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <select name="role" value={inputs.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage
