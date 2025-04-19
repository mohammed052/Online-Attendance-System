import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import { useAuth } from '../context/AuthContext'

const CoursePage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const  role  = user?.role || 'student' // Default to 'student' if role is not available

  const { data, error, isLoading } = useFetch(
    role ==='teacher' ? `/api/teacher/study-material/${id}` :
    `/api/student/course-material/${id}`
  )

  const handleDownload = async () => {
    try {
      // Fetch the attendance data from the server
      const response = await fetch(`/api/teacher/download-attendance/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to download attendance')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = `attendance_${id}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading attendance:', error)
      alert('Failed to download attendance. Please try again later.')
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const courseTitle = data?.courseTitle || `Course ${id}`
  const studyMaterials = (data?.studyMaterials || [])
  const inviteCode = data?.inviteCode || ''

  return (
    <div className="course-page container">
      <h1>{courseTitle}</h1>
      {role === 'teacher' && (
        <>
          <div className="flex-row">
            <a href={`/teacher/mark-attendance/${id}`} className="button">
              Mark Attendance
            </a>
            <a href={`/teacher/upload-material/${id}`} className="button">
              Upload Study Material
            </a>
            Student Invite Code: <strong>{inviteCode}</strong>
          </div>
          <div>
            <button className="button" onClick={handleDownload}>
              📥 Download Attendance
            </button>
          </div>
        </>
      )}
      <h2>Study Materials</h2>
      {studyMaterials.length > 0 ? (
        <ul>
          {studyMaterials.map((material) => (
            <li key={material._id} className="list-item">
              <p>
                <strong>{material.title}</strong>
              </p>
              <p>{material.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No study materials uploaded yet.</p>
      )}
    </div>
  )
}

export default CoursePage
