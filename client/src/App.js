import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import LoginPage from './pages/LoginPage'
import TeacherHome from './pages/TeacherHome'
import Navbar from './components/Navbar'
import AddCourses from './pages/AddCourses'
import NotFound from './pages/NotFound'
import AdminHomePage from './pages/AdminHomePage'
import AddTeacher from './pages/AddTeacher'
import AddStudent from './pages/AddStudent'
import CoursePage from './pages/CoursePage'
import MarkAttendance from './pages/MarkAttendancePage'
import UploadStudyMaterial from './pages/UploadStudyMaterial'
import StudentHomePage from './pages/StudentHomePage'
import PrivateRoute from './components/PrivateRoutes'
import './index.css'
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth()

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage />
            ) : user.role === 'admin' ? (
              <AdminHomePage />
            ) : user.role === 'teacher' ? (
              <TeacherHome />
            ) : user.role === 'student' ? (
              <StudentHomePage />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-course"
          element={
            <PrivateRoute requiredRole="admin">
              <AddCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-teacher"
          element={
            <PrivateRoute requiredRole="admin">
              <AddTeacher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-student"
          element={
            <PrivateRoute requiredRole="admin">
              <AddStudent />
            </PrivateRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/mark-attendance/:id"
          element={<MarkAttendance />}
        />
        <Route
          path="/teacher/upload-material/:id"
          element={<UploadStudyMaterial />}
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <PrivateRoute requiredRole="student">
              <StudentHomePage />
            </PrivateRoute>
          }
        />

        {/* Shared */}
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}


export default App
