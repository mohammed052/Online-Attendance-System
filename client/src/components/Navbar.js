import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // adjust path if needed

const Navbar = () => {
  const { logout } = useAuth() // Get user and logout function from context
  const navigate = useNavigate()

  const handleLogout = () => {
    logout() // Call logout function from context
    navigate('/') // redirect to login
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 style={{ color: 'white' }}>Attendance Tracker</h1>
      </div>
      <div className="navbar-links">
        <Link to="/teacher" className="navbar-link">
          Home
        </Link>
        <Link to="/admin" className="navbar-link">
          Admin
        </Link>
        <Link to="/" className="navbar-link">
          Login
        </Link>
        <button
          onClick={handleLogout}
          className="navbar-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
