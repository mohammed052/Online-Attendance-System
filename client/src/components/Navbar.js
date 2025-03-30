import { React } from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Attendance Tracker</h1>
      </div>
      <div className="navbar-links">
        <Link to="/teacher" className="navbar-link">
          Home
        </Link>
        <Link to="/add-course" className="navbar-link">
          Add Course
        </Link>
        <Link to="/admin" className="navbar-link">
          Admin
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
