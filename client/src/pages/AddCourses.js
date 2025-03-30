import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCourses = () => {
  const [courseTitle, setCourseTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const course = { title: courseTitle }
    setIsLoading(true)

    fetch('/api/admin/create-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    }).then(() => {
      console.log('New course added')
      setIsLoading(false)
      navigate('/teacher')
    })
  }

  return (
    <div className="add-courses container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Course Title</label>
        <input
          type="text"
          className="input"
          required
          value={courseTitle}
          onChange={(e) => {
            setCourseTitle(e.target.value)
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
