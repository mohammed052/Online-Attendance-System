import { Link } from 'react-router-dom'
import useFetch from '../useFetch'

const AdminHomePage = () => {
  const { data: courses } = useFetch('/api/admin/courses')
  const { data: teachers } = useFetch('/api/admin/teachers')
  const { data : students} = useFetch('/api/admin/students')
  
  return (
    <div className="admin-page-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-links">
        <Link to="/admin/add-course" className="button">
          ➕ Add Course
        </Link>
        <Link to="/admin/add-teacher" className="button">
          ➕ Add Teacher
        </Link>
        <Link to="/admin/add-student" className="button">
          ➕ Add Student
        </Link>
      </div>
      <div className="admin-section">
        <h2>Courses</h2>
        <ul>
          {courses &&
            courses.courses.map((title, index) => <li key={index}>{title}</li>)}
        </ul>

        <h2>Teachers</h2>
        <ul>
          {teachers &&
            teachers.teachers.map((teacher) => (
              <li key={teacher.id}>{teacher.name}</li>
            ))}
        </ul>

        <h2>Students</h2>
        <ul>
          {students &&
            students.students.map((name, index) => <li key={index}>{name}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default AdminHomePage
