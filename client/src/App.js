import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import LoginPage from './pages/LoginPage'
import TeacherHome from './pages/TeacherHome'
import AttendancePage from './pages/AttendancePage'
import Navbar from './components/Navbar'
import AddCourses from './pages/AddCourses'
import NotFound from './pages/NotFound'
import AdminHomePage from './pages/AdminHomePage'
import AddTeacher from './pages/AddTeacher'
import AddStudent from './pages/AddStudent'


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/attendance/:id" element={<AttendancePage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/add-course" element={<AddCourses />} />
          <Route path="/admin/add-teacher" element={<AddTeacher />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
