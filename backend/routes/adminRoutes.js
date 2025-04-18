const express = require('express')
const { createCourse, addTeacher, addStudent, addAdmin,
   assignTeacherToCourse, getAllCourses, getAllStudents,
  getAllTeachers, deleteCourse, enrollStudentInCourse,
  deleteStudent, deleteTeacher } = require('../controllers/AdminControllers')
const { protectRole } = require('../middleware/authMiddleware') 

router = express.Router()

router.use(protectRole('admin')) // Protect all routes with admin role

router.post('/create-course',createCourse)

router.post('/add-teacher', addTeacher)

router.post('/add-student', addStudent)

router.post('/add-admin', addAdmin)

router.post('/assign-teacher/:courseId', assignTeacherToCourse)

router.post('/enroll-student/:courseId', enrollStudentInCourse)

router.get('/courses', getAllCourses)

router.get('/teachers', getAllTeachers)

router.get('/students', getAllStudents)

router.delete('/delete-course/:courseId', deleteCourse)

router.delete('/delete-student/:studentId', deleteStudent)

router.delete('/delete-teacher/:teacherId', deleteTeacher)

module.exports = router
