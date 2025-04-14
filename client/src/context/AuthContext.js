// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// Create context
const AuthContext = createContext()

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // You can set more user info here
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check localStorage for token on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('user'))
    if (token && userInfo) {
      setUser(userInfo)
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (token, userInfo) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userInfo))
    setUser(userInfo)
    navigate('/dashboard') // or any other route
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = () => useContext(AuthContext)
