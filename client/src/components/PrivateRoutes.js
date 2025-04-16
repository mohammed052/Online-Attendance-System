// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) return <p>Loading...</p>

  if (!isAuthenticated) return <Navigate to="/login" />

  // If a specific role is required and doesn't match, block access
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />
  }

  return children
}

export default PrivateRoute