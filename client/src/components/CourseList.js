import {Link} from 'react-router-dom'

const CourseList = ({ courses }) => {
  const courseArray = courses.courses || [] // Extract array

  if (!Array.isArray(courseArray)) {
    console.error(
      "Expected 'courses.courses' to be an array, but got:",
      courses
    )
    return <p>No courses available.</p>
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
            to={`/attendance/${course._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <span style={{ marginRight: '20px' }}>{course.title}</span>
          </Link>
          <button style={{ cursor: 'pointer' }}>📥 Download</button>
        </div>
      ))}
    </div>
  )
}

export default CourseList