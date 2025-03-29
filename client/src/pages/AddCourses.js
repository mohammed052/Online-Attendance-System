import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddCourses.css'

const AddCourses = () => {
  const [batch, setBatch] = useState('')
  const [courseName, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const course = { batch, courseName }
    setIsLoading(true)

    fetch('http://localhost:8000/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    }).then(() => {
      console.log('new course added')
      setIsLoading(false)
      navigate('/teacher')
    })
  }

  return (
    <div className="add-courses container">
      <h2>Add New Batch & Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Year & Branch
          <input
            type="text"
            className="input"
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value)
            }}
            required
          />
        </label>
        <label>Enter Course Name</label>
        <input
          type="text"
          className="input"
          required
          value={courseName}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        {isLoading && (
          <button className="button" disabled>
            Adding New Course..
          </button>
        )}
        {!isLoading && <button className="button">Add Course</button>}
      </form>
    </div>
  )
}

export default AddCourses
