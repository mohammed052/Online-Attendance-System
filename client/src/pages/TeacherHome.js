import CourseList from '../components/CourseList'
import useFetch from '../useFetch'

function TeacherHome() {
  const {
    data: courses,
    error,
    isLoading,
  } = useFetch('/api/teacher/my-courses')

  return (
    <div className="teacher-home">
      <h1>Teacher Home</h1>
      {error && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {courses && <CourseList courses={courses} />}
    </div>
  )
}

export default TeacherHome
