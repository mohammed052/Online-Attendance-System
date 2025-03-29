const User = require('../models/userModel')
const Course = require('../models/courseModel')

// get all courses for a student
const getAllCourses = async (req, res) => {
  const studentId = req.query.studentId
  try {
    const courses = await Course.find({ students: studentId })
    if(!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this student' })
    }
    res.status(200).json({ courses })
  } catch {
    res.status(400).json({ message: error.message })
  }
}

// get study material for a course
const getStudyMaterial = async (req, res) => {
  const { courseId } = req.params
  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json({ studyMaterials: course.studyMaterials })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// get attendance for a course
const getAttendance = async (req, res) => {
  const { courseId } = req.params
  const studentId = req.query.studentId
  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    const attendance = course.attendanceSheet.find(
      (attendance) => attendance.studentId.toString() === studentId
    )
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' })
    }
    // Extract only the dates where isPresent is true
    const presentDates = attendance.records
      .filter((record) => record.isPresent)
      .map((record) => record.date.toISOString().split('T')[0]) // Format: YYYY-MM-DD

    res.status(200).json({ studentId, presentDates })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getAllCourses,
  getStudyMaterial,
  getAttendance,
}
