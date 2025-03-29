import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPage.css'

const AdminPage = () => {
  const [courseName, setCourseName] = useState('')
  const [faculty, setFaculty] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const course = { courseName, faculty }
    setIsLoading(true)

    fetch('http://localhost:8000/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    }).then(() => {
      console.log('new course added')
      setIsLoading(false)
      navigate('/admin')
    })
  }

  return (
    <div className="admin-page container">
      <h2>Initiate New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Course Name
          <input
            type="text"
            className="input"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </label>
        <label>
          Assign Faculty
          <input
            type="text"
            className="input"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          />
        </label>
        {isLoading && (
          <button className="button" disabled>
            Adding New Course...
          </button>
        )}
        {!isLoading && <button className="button">Add Course</button>}
      </form>
    </div>
  )
}

export default AdminPage
