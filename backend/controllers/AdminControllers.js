const User = require('../models/userModel')
const Course = require('../models/courseModel')

// create course
const createCourse = async (req, res) => {
  const { title } = req.body
  try {
    const course = await Course.create({ title })
    res.status(200).json({ course })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// add teacher to database
const addTeacher = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const teacher = await User.create({
      name,
      email,
      password,
      role: 'teacher',
    })
    res.status(200).json({ teacher })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// add student to database  
const addStudent = async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  try {
    const student = await User.create({
      name,
      email,
      password,
      role: 'student',
    })
    res.status(200).json({ student })
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
    res.status(200).json({ courses })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// get all teachers
const getAllTeachers = async (req,res) => {
  try {
    const teachers = await User.find({role: 'teacher'})
    res.status(200).json({teachers})
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
}

const getAllStudents = async (req,res) => {
  try {
    const students = await User.find({role: 'student'})
    res.status(200).json({students})
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

module.exports = {
  createCourse,
  addTeacher,
  addStudent,
  assignTeacherToCourse,
  getAllCourses,
  getAllTeachers,
  getAllStudents,
  deleteCourse,
  enrollStudentInCourse,
}
