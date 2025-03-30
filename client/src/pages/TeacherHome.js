// import { useState ,useEffect } from 'react'
import CourseList from '../components/CourseList'
import useFetch from '../useFetch'

function TeacherHome() {

    // const { data : courses , error, isLoading } = useFetch('/api/teacher/my-courses')
    const {data } = useFetch('/api/teacher/my-courses')
    // const [courses, setCourses] = useState(data)    
  
  return (
    <div>
      <h1> TeacherHome </h1>
      {/* // print data from backend for testing */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <h2> Courses </h2> */}
      {/* <div>
        { error && <div> {error.message} </div> }
        { isLoading && <div>Loading...</div> }
        { courses && 
          <CourseList courses={courses} />}
      </div> */}
    </div>
  )
}

export default TeacherHome
