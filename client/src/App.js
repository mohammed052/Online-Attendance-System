import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import LoginPage from './pages/LoginPage'
import TeacherHome from './pages/TeacherHome'
import AttendancePage from './pages/AttendancePage'
import Navbar from './components/Navbar'
import AddCourses from './pages/AddCourses'
import NotFound from './pages/NotFound'
import AdminPage from './pages/AdminPage'
import AdminHomePage from './pages/AdminHomePage'
// import './pages/TeacherHome.css'
// import './pages/NotFound.css'
// import './pages/LoginPage.css'
// import './components/CourseList.css'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/attendance/:id" element={<AttendancePage />} />
          <Route path="/add-course" element={<AddCourses />} />
          {/* <Route path="/admin" element={<AdminPage />} /> */}
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
