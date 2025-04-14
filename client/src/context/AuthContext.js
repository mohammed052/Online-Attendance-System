import { createContext, useState, useEffect, useContext } from 'react'

// Create context
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('user'))
    if (token && userInfo) {
      setUser(userInfo)
    }
    setLoading(false)
  }, [])

  const login = (token, userInfo) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userInfo))
    setUser(userInfo)
    // Don't navigate here
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    // Navigation handled elsewhere
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
