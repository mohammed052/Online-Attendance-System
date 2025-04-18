const User = require('../models/userModel')
const Course = require('../models/courseModel')
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

// get all courses for a teacher
const getAllCourses = async (req, res) => {
    const teacherId = req.user._id // Get teacher ID from the request object
    try {
        const courses = await Course.find({ teacher: teacherId })
        // const courses = await Course.find()
        // send only course id and name to frontend
        // const courseDetails = courses.map((course) => ({
        //     id: course._id,
        //     title: course.title,
        // }))
        res.status(200).json({ courses })
        // res.status(200).json({ courses })
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
        // console.log('Material:', material)
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
        const studyMaterials = course.studyMaterials.filter(
          (material) => material !== null
        )
        // res.status(200).json({ studyMaterials })
        res.status(200).json({
          courseTitle : course.title,
          studyMaterials : studyMaterials,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// mark attendance for a course
const markAttendance = async (req, res) => {
  const { courseId } = req.params;
  let { studentIds } = req.body; // Expecting an array of student IDs

  // console.log("Student IDs:", studentIds); // Debugging

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure studentIds is always an array, even if a single student is sent
    if (!Array.isArray(studentIds)) {
      studentIds = [studentIds];
    }

    // UTC date normalization
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight

    console.log("Corrected Today’s Date:", today.toISOString()); // Debugging

    for (const studentId of studentIds) {
      let studentAttendance = course.attendanceSheet.find(
        (attendance) => attendance.studentId.toString() === studentId
      );

      if (studentAttendance) {
        // Check if attendance is already marked for today
        const alreadyMarked = studentAttendance.records.some((record) => {
          const recordDate = new Date(record.date);
          recordDate.setUTCHours(0, 0, 0, 0); // Normalize stored date to UTC
          return recordDate.getTime() === today.getTime();
        });

        console.log("Already marked:", alreadyMarked); // Debugging

        // If not already marked, push the new record
        if (!alreadyMarked) {
          studentAttendance.records.push({ date: today, isPresent: true });
        }
      } else {
        // Fetch student name from User model and create a new attendance record
        const student = await User.findById(studentId);
        if (student) {
          course.attendanceSheet.push({
            studentId,
            studentName: student.name,
            records: [{ date: today, isPresent: true }],
          });
        }
      }
    }

    await course.save();
    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// download attendance for a course
const downloadAttendance = async (req, res) => {
  const { courseId } = req.params

  try {
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    const { attendanceSheet } = course
    if (!attendanceSheet || attendanceSheet.length === 0) {
      return res.status(400).json({ message: 'No attendance records found' })
    }

    // Use a Set for unique dates and sort them
    const allDates = new Set()
    const attendanceMap = new Map()

    attendanceSheet.forEach((student) => {
      const studentRecords = new Map() // Store attendance as { date -> P/NP }
      student.records.forEach((record) => {
        const formattedDate = record.date.toISOString().split('T')[0]
        allDates.add(formattedDate)
        studentRecords.set(formattedDate, record.isPresent ? 'P' : 'NP')
      })
      attendanceMap.set(student.studentId.toString(), {
        name: student.studentName,
        records: studentRecords,
      })
    })

    const sortedDates = Array.from(allDates).sort() // Sort dates in ascending order

    // Construct Excel Data
    const excelData = [['Student ID', 'Student Name', ...sortedDates]]

    attendanceMap.forEach((student, studentId) => {
      const row = [studentId, student.name]
      sortedDates.forEach((date) => {
        row.push(student.records.get(date) || 'NP') // Default to 'NP' if no record
      })
      excelData.push(row)
    })

    console.log('Excel Data:', excelData) // Debugging

    // Create and save Excel file
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(excelData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance')

    const filePath = path.join(__dirname, 'attendance.xlsx')
    XLSX.writeFile(workbook, filePath)

    // Send file for download
    res.download(filePath, 'attendance.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err)
        res.status(500).json({ message: 'Error generating file' })
      }
      fs.unlinkSync(filePath) // Delete temp file after sending
    })
  } catch (error) {
    console.error('Error downloading attendance:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


module.exports = { 
    getAllCourses,
    uploadMaterial,
    markAttendance,
    downloadAttendance,
    getStudyMaterial,
}