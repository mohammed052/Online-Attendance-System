const express = require('express')
const { createCourse, addTeacher, addStudent,
   assignTeacherToCourse, getAllCourses, getAllStudents,
  getAllTeachers, deleteCourse, enrollStudentInCourse } = require('../controllers/AdminControllers')

router = express.Router()

router.post('/create-course',createCourse)

router.post('/add-teacher', addTeacher)

router.post('/add-student', addStudent)

router.post('/assign-teacher/:courseId', assignTeacherToCourse)

router.post('/enroll-student/:courseId', enrollStudentInCourse)

router.get('/courses', getAllCourses)

router.get('/teachers', getAllTeachers)

router.get('/students', getAllStudents)

router.delete('/delete-course/:courseId', deleteCourse)

module.exports = router
