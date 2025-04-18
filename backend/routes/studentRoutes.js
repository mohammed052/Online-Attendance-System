const express = require('express');
const User = require('../models/userModel')
const Course = require('../models/courseModel')
const {
  getAllCourses,
  getStudyMaterial,
  getAttendance,  
} = require('../controllers/studentController')
const { protectRole } = require('../middleware/authMiddleware')

router = express.Router();

router.use(protectRole('student')) // Protect all routes with student role

router.get('/my-courses', getAllCourses);

router.get('/course-material/:courseId', getStudyMaterial);

router.get('/attendance/:courseId', getAttendance);

module.exports = router;

