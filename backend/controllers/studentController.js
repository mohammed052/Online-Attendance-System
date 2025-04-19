const User = require('../models/userModel')
const Course = require('../models/courseModel')

// get all courses for a student
const getAllCourses = async (req, res) => {
  const studentId = req.user._id
  try {
    const courses = await Course.find({ students: studentId })
    if(!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this student' })
    }
    // send only course id and name to frontend
    const courseDetails = courses.map((course) => ({
      id: course._id,
      title: course.title,
    }))
    res.status(200).json({ courses: courseDetails })

    // res.status(200).json({ courses })
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
  const studentId = req.user._id
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

const registerToCourse = async (req, res) => {
  try {
    const { inviteCode } = req.body
    const studentId = req.user._id

    const course = await Course.findOne({ inviteCode })
    if (!course) {
      return res.status(404).json({ message: 'Invalid invite code' })
    }

    // Optional: Check if already enrolled
    if (course.students.includes(studentId)) {
      return res
        .status(400)
        .json({ message: 'Already registered to this course' })
    }

    // Add student to course
    course.students.push(studentId)
    await course.save()

    res.status(200).json({ message: 'Successfully registered to course' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getAllCourses,
  getStudyMaterial,
  getAttendance,
  registerToCourse,
}
