const express = require('express');
const {
  getAllCourses,
  uploadMaterial,
  markAttendance,
  downloadAttendance,
  getStudyMaterial,
} = require('../controllers/teacherController');

router = express.Router();

router.get('/my-courses', getAllCourses);

router.post('/upload-material/:courseId', uploadMaterial);

router.post('/mark-attendance/:courseId', markAttendance);

router.get('/download-attendance/:courseId', downloadAttendance);

router.get('/study-material/:courseId', getStudyMaterial);

module.exports = router;
