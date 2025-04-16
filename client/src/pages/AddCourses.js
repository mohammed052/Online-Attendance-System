import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCourses = () => {
  const [courseTitle, setCourseTitle] = useState('')
  const [teachers, setTeachers] = useState([])
  const [selectedTeacherId, setSelectedTeacherId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/admin/teachers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load teachers')
        setTeachers(data.teachers)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchTeachers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const course = {
      title: courseTitle,
      teacherId: selectedTeacherId,
    }

    try {
      const res = await fetch('/api/admin/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(course),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to create course')

      console.log('New course added')
      setIsLoading(false)
      navigate('/admin')
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }

  return (
    <div
      className="form-container"
      style={{
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px 40px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        Add New Course
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          style={{
            margin: '12px 0 6px',
            fontWeight: '500',
            color: '#444',
          }}
        >
          Enter Course Title
        </label>
        <input
          type="text"
          required
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        />

        <label
          style={{
            margin: '12px 0 6px',
            fontWeight: '500',
            color: '#444',
          }}
        >
          Assign Faculty
        </label>
        <select
          required
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
          style={{
            padding: '10px 14px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        >
          <option value="" disabled>
            -- Select Faculty --
          </option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>

        {isLoading ? (
          <button
            disabled
            style={{
              padding: '12px',
              backgroundColor: '#007bff',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              borderRadius: '6px',
              cursor: 'not-allowed',
              width: '100%',
            }}
          >
            Adding New Course...
          </button>
        ) : (
          <button
            style={{
              padding: '12px',
              backgroundColor: '#007bff',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Add Course
          </button>
        )}

        {error && (
          <p
            style={{
              color: 'red',
              marginTop: '10px',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  )
}

export default AddCourses
