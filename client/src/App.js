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

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher" element={<TeacherHome />} />
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
          <Route path="/course/:id" element={<CoursePage />} />
          <Route
            path="/teacher/mark-attendance/:id"
            element={<MarkAttendance />}
          />
          <Route
            path="/teacher/upload-material/:id"
            element={<UploadStudyMaterial />}
          />
          <Route path="/student/:studentId" element={<StudentHomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
