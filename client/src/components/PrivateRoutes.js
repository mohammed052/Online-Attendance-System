// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
