import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'

const CoursePage = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useFetch(
    `/api/teacher/study-material/${id}`
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  const courseTitle = data?.courseTitle || `course ${id}`
  // Ensure `studyMaterials` is always an array and filter out `null` values
  const studyMaterials = (data?.studyMaterials || []).filter(
    (material) => material !== null
  )

  return (
    <div className="course-page">
      <h1>{ courseTitle }</h1>

      <div className="actions">
        <a href={`/teacher/mark-attendance/${id}`} className="button">
          Mark Attendance
        </a>
        <a href={`/teacher/upload-material/${id}`} className="button">
          Upload Study Material
        </a>
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
