const express = require('express')
const { createCourse, addTeacher, addStudent,
   assignTeacherToCourse, getAllCourses, getAllStudents,
  getAllTeachers, deleteCourse } = require('../controllers/AdminControllers')

router = express.Router()

router.post('/create-course',createCourse)

router.post('/add-teacher', addTeacher)

router.post('/add-student', addStudent)

router.post('/assign-teacher/:courseId', assignTeacherToCourse)

router.get('/courses', getAllCourses)

router.get('/teachers', getAllTeachers)

router.get('/students', getAllStudents)

router.delete('/delete-course/:courseId', deleteCourse)

module.exports = router
