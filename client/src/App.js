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


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/add-course" element={<AddCourses />} />
          <Route path="/admin/add-teacher" element={<AddTeacher />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/teacher/mark-attendance/:id" element={<MarkAttendance />} />
          <Route path="/teacher/upload-material/:id" element={<UploadStudyMaterial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
