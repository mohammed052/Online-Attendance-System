// import { useState ,useEffect } from 'react'
import CourseList from '../components/CourseList'
import useFetch from '../useFetch'

function TeacherHome() {

    const { data : courses , error, isLoading } = useFetch('http://localhost:8000/courses')
    
  
  return (
    <div>
      <h1> TeacherHome </h1>
      <div>
        { error && <div> {error.message} </div> }
        { isLoading && <div>Loading...</div> }
        { courses && 
          <CourseList courses={courses} />}
      </div>
    </div>
  )
}

export default TeacherHome
