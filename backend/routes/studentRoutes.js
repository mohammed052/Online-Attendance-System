const express = require('express');
const User = require('../models/userModel')
const Course = require('../models/courseModel')
const {
  getAllCourses,
  getStudyMaterial,
  getAttendance,  
} = require('../controllers/studentController')

router = express.Router();

router.get('/my-courses', getAllCourses);

router.get('/course-material/:courseId', getStudyMaterial);

router.get('/attendance/:courseId', getAttendance);

module.exports = router;

