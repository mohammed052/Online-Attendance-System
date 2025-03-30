// admin home page displaying courses, teachers and students
import useFetch from "../useFetch"

const AdminHomePage = () => {
    const {courses} = useFetch('/api/admin/courses')
    const {teachers} = useFetch('/api/admin/teachers')
    const {students} = useFetch('/api/admin/students')
    return (
        <div>
            <h1>Admin Home Page</h1>
            <h2>Courses</h2>
            <pre>{JSON.stringify(courses, null, 2)}</pre>
            <h2>Teachers</h2>
            <pre>{JSON.stringify(teachers, null, 2)}</pre>
            <h2>Students</h2>
            <pre>{JSON.stringify(students, null, 2)}</pre>
        </div>
    )
}

export default AdminHomePage