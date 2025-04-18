import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CourseList = ({ courses }) => {
  const courseArray = courses.courses || [] // Extract array
  const { user } = useAuth()


  if (!Array.isArray(courseArray)) {
    console.error(
      "Expected 'courses.courses' to be an array, but got:",
      courses
    )
    return <p>No courses available.</p>
  }

  const handleDownload = async (id) => {
    try {
      const response = await fetch(`/api/teacher/download-attendance/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Include JWT token
        },
      })

      if (!response.ok) {
        throw new Error('Failed to download attendance')
      }

      // Get file blob (Excel/CSV/whatever backend sends)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `attendance_${id}.xlsx` // Adjust name/extension if needed
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading attendance:', error)
      alert('Failed to download attendance. Please try again later.')
    }
  }


  return (
    <div className="courselist">
      {courseArray.map((course) => (
        <div
          className="course-preview"
          key={course._id}
          style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}
        >
          <Link
            to={`/course/${course._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="course-preview"
              key={course._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px 0',
              }}
            >
              <span style={{ marginRight: '20px' }}>{course.title}</span>
              <button
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleDownload(course._id) // Pass course ID to download function
                }}
              >
                📥 Download
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CourseList