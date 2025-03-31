import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'

const CoursePage = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useFetch(
    `/api/teacher/study-material/${id}`
  )

  const handleDownload = async () => {
    try {
      // Fetch the attendance data from the server
      const response = await fetch(`/api/teacher/download-attendance/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  const studyMaterials = (data?.studyMaterials || []).filter(
    (material) => material !== null
  )

  return (
    <div className="course-page">
      <h1>{courseTitle}</h1>

      <div className="actions">
        <a href={`/teacher/mark-attendance/${id}`} className="button">
          Mark Attendance
        </a>
        <a href={`/teacher/upload-material/${id}`} className="button">
          Upload Study Material
        </a>
      </div>
      <div>
        <button className="button" onClick={handleDownload}>
          📥 Download Attendance
        </button>
      </div>

      <h2>Study Materials</h2>
      {studyMaterials.length > 0 ? (
        <ul>
          {studyMaterials.map((material) => (
            <li key={material._id}>
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
