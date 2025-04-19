const User = require('../models/userModel')
const Course = require('../models/courseModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const generateInviteCode = () => {
  return crypto.randomBytes(4).toString('hex')
}

// create course
const createCourse = async (req, res) => {
  const { title, teacherId } = req.body

  try {
    // Validate inputs
    if (!title || !teacherId) {
      return res
        .status(400)
        .json({ message: 'Title and teacherId are required' })
    }

    const teacher = await User.findById(teacherId)

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    if (teacher.role !== 'teacher') {
      return res.status(400).json({ message: 'User is not a teacher' })
    }
    const inviteCode = generateInviteCode()
    const course = await Course.create({ title, teacher: teacherId, inviteCode })

    res.status(200).json({
      message: `Course '${title}' created and assigned to ${teacher.name}`,
      course,
    })
  } catch (error) {
    console.error('Error creating course:', error)
    res.status(400).json({ message: error.message })
  }
}


// add teacher to database
const addTeacher = async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  try {
    const teacher = await User.signup(
      name,
      email,
      password,
      'teacher'
    )
    const token = jwt.sign(
      { id: teacher._id, role: teacher.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({
      name: teacher.name,
      email: teacher.email,
      role: teacher.role,
      token,
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message })
  }
}

// add student to database  
const addStudent = async (req, res) => {
  // console.log(req.body)
  const { name, email, password } = req.body
  try {
    const student = await User.signup(
      name,
      email,
      password,
      'student'
    )
    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.status(200).json({
      name: student.name,
      email: student.email,
      role: student.role,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// add admin
const addAdmin = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const admin = await User.signup(
      name,
      email,
      password,
      'admin'
    )
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.status(200).json({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//assing techer to course
const assignTeacherToCourse = async (req, res) => {
  const { courseId } = req.params
  const { teacherId } = req.body
  try {
    const course = await Course.findById(courseId)
    const teacher = await User.findById(teacherId)

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    // check if a teacher is already assigned to the course
    if (course.teacher) {
      return res
        .status(400)
        .json({ message: 'Teacher already assigned to this course' })
    }
    // assign teacher to course
    course.teacher = teacher._id
    await course.save()

    res
  .status(200)
  .json({ message: `Teacher ${teacher.name} assigned to course ${course.title}` })
   } catch (error) {
    console.log('Error assigning teacher to course:', error)
    res.status(400).json({ message: error.message })
  }
}

// enroll student in course
const enrollStudentInCourse = async (req, res) => {
  const { courseId } = req.params
  const { studentId } = req.body
  try {
    const course = await Course.findById(courseId)
    const student = await User.findById(studentId)

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // check if a student is already enrolled in the course
    if (course.students.includes(student._id)) {
      return res
        .status(400)
        .json({ message: 'Student already enrolled in this course' })
    }
    // enroll student in course
    course.students.push(student._id)
    await course.save()

    res.status(200).json({
      message: `Student ${student.name} enrolled in course ${course.title}`,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    // res.status(200).json({ courses })
    // send course titles to frontend
    const courseTitles = courses.map((course) => course.title)
    res.status(200).json({ courses: courseTitles })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// get all teachers
const getAllTeachers = async (req,res) => {
  try {
    const teachers = await User.find({role: 'teacher'})
    // send teacher names and ids
    
    res.status(200).json({teachers: teachers.map((teacher) => ({name: teacher.name, id: teacher._id}))})
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
}

// get all students
const getAllStudents = async (req,res) => {
  try {
    const students = await User.find({role: 'student'})
    // send student names to frontend
    const studentNames = students.map((student) => student.name)
    res.status(200).json({students: studentNames})
    // res.status(200).json({students})
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
} 

// delete course
const deleteCourse = async (req, res) => {
  const { courseId } = req.params
  try {
    const course = await Course.findByIdAndDelete(courseId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json({ message: `Course ${course.title} deleted succesfully` })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// delete student
const deleteStudent = async (req, res) => {
  const { studentId } = req.params
  try {
    const student = await User.findByIdAndDelete(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.status(200).json({ message: `Student ${student.name} deleted succesfully` })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// delete teacher
const deleteTeacher = async (req, res) => {
  const { teacherId } = req.params
  try {
    const teacher = await User.findByIdAndDelete(teacherId)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(200).json({ message: `Teacher ${teacher.name} deleted succesfully` })  
  }
  catch(error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  createCourse,
  addTeacher,
  addStudent,
  addAdmin,
  assignTeacherToCourse,
  getAllCourses,
  getAllTeachers,
  getAllStudents,
  deleteCourse,
  enrollStudentInCourse,
  deleteStudent, deleteTeacher
}
