const User = require('../models/userModel')
const Course = require('../models/courseModel')
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

// get all courses for a teacher
const getAllCourses = async (req, res) => {
    const teacherId = req.query.teacherId
    try {
        const courses = await Course.find({ teacher: teacherId })
        res.status(200).json({ courses })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// upload material for a course
const uploadMaterial = async (req, res) => {
    const { courseId } = req.params
    console.log(req.body)
    const { material } = req.body
    try {
        console.log('Material:', material)
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: 'Course not found' })
        }
        course.studyMaterials.push(material)
        await course.save()
        res.status(200).json({ message: 'Material uploaded successfully' })
    } catch (error) {
        console.log('Material :', material)
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

// mark attendance for a course
const markAttendance = async (req, res) => {
  const { courseId } = req.params
  let { studentIds } = req.body // Expecting an array of student IDs

  console.log('Student IDs:', studentIds) // Debugging

  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Ensure studentIds is always an array, even if a single student is sent
    if (!Array.isArray(studentIds)) {
      studentIds = [studentIds]
    }

    const today = new Date().setHours(0, 0, 0, 0) // Normalize date to remove time

    for (const studentId of studentIds) {
      let studentAttendance = course.attendanceSheet.find(
        (attendance) => attendance.studentId.toString() === studentId
      )

      if (studentAttendance) {
        // Check if attendance is already marked for today
        const alreadyMarked = studentAttendance.records.some(
          (record) => new Date(record.date).setHours(0, 0, 0, 0) === today
        )

        if (!alreadyMarked) {
          studentAttendance.records.push({ date: today, isPresent: true })
        }
      } else {
        // Fetch student name from User model and create a new attendance record
        const student = await User.findById(studentId)
        if (student) {
          course.attendanceSheet.push({
            studentId,
            studentName: student.name,
            records: [{ date: today, isPresent: true }],
          })
        }
      }
    }

    await course.save()
    res.status(200).json({ message: 'Attendance marked successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


// download attendance for a course


const downloadAttendance = async (req, res) => {
  const { courseId } = req.params

  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Extracting attendance data
    const attendanceSheet = course.attendanceSheet
    if (!attendanceSheet || attendanceSheet.length === 0) {
      return res.status(400).json({ message: 'No attendance records found' })
    }

    // Get all unique dates across all students
    const allDates = new Set()
    attendanceSheet.forEach((student) => {
      student.records.forEach((record) => {
        allDates.add(record.date.toISOString().split('T')[0]) // Format date (YYYY-MM-DD)
      })
    })
    const sortedDates = Array.from(allDates).sort() // Sort dates in order

    // Create Excel data with headers
    const excelData = []
    const headers = ['Student ID', 'Student Name', ...sortedDates] // Header row

    excelData.push(headers)

    // Populate attendance data for each student
    attendanceSheet.forEach((student) => {
      const row = [student.studentId.toString(), student.studentName]

      // Fill attendance for each date
      sortedDates.forEach((date) => {
        const record = student.records.find(
          (r) => r.date.toISOString().split('T')[0] === date
        )
        row.push(record ? 'P' : 'NP') // Present or Not Present
      })

      excelData.push(row)
    })
    console.log('Excel Data:', excelData) // Debugging
    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(excelData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance')

    // Save the file temporarily
    const filePath = path.join(__dirname, 'attendance.xlsx')
    XLSX.writeFile(workbook, filePath)

    // Send the file for download
    res.download(filePath, 'attendance.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err)
        res.status(500).json({ message: 'Error generating file' })
      }
      fs.unlinkSync(filePath) // Delete temp file after sending
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { downloadAttendance }



module.exports = { 
    getAllCourses,
    uploadMaterial,
    markAttendance,
    downloadAttendance,
    getStudyMaterial,
}