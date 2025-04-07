import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'

const StudentHomePage = () => {
  // Get student id from query parameters
  const { studentId } = useParams()

  // Fetch courses for the student
  const { data, error, isLoading } = useFetch(
    `/api/student/my-courses?studentId=${studentId}`
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Courses</h1>

      {isLoading && <p>Loading courses...</p>}
      {error && (
        <p className="text-red-500">
          Error: {error.message || 'Something went wrong.'}
        </p>
      )}

      <div className="grid gap-4">
        {data?.courses?.length > 0
          ? data.courses.map((course) => (
              <div
                key={course.id}
                className="border rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200"
              >
                <h2 className="text-lg font-medium">{course.title}</h2>
                {/* Optional: Add a link to course detail page */}
                {/* <Link to={`/student/${studentId}/course/${course.id}`} className="text-blue-500 underline">View Details</Link> */}
              </div>
            ))
          : !isLoading && <p>No courses found.</p>}
      </div>
    </div>
  )
}

export default StudentHomePage
