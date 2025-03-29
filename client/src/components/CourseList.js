import { Link } from 'react-router-dom'

const CourseList = ({ courses }) => {

  return (
    <div className="courselist">
      {courses.map((course) => (
        <div
          className="course-preview"
          key={course.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '10px 0',
            // textDecoration: 'none',
          }}
        >
          <Link
            to={`/attendance/${course.id}`}
            style={{ textDecoration: 'none', color: 'inherit'}}
          >
            <span style={{ marginRight: '20px' }}>
              {course.batch} - {course.courseName}
            </span>
          </Link>
          <button
            //   onClick={() => handleDownload(course.id)}
            style={{ cursor: 'pointer' }}
          >
            📥 Download
          </button>
        </div>
      ))}
    </div>
  )
}

export default CourseList
