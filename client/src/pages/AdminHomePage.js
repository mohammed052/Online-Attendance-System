import { Link } from 'react-router-dom'
import useFetch from '../useFetch'

const AdminHomePage = () => {
  const { data: courses } = useFetch('/api/admin/courses')
  const { data: teachers } = useFetch('/api/admin/teachers')

  return (
    <div className="admin-home">
      <h1>Admin Home Page</h1>

      <div className="links">
        <Link to="/admin/add-course">Add Course</Link> |
        <Link to="/admin/add-teacher">Add Teacher</Link> |
        <Link to="/admin/add-student">Add Student</Link>
      </div>

      <h2>Courses</h2>
      <ul>
        {courses &&
          courses.courses.map((title, index) => <li key={index}>{title}</li>)}
      </ul>

      <h2>Teachers</h2>
      <ul>
        {teachers &&
          teachers.teachers.map((name, index) => <li key={index}>{name}</li>)}
      </ul>
    </div>
  )
}

export default AdminHomePage
