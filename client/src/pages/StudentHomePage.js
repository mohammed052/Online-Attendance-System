import { useState } from 'react'
import useFetch from '../useFetch'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const StudentHomePage = () => {
  const { user } = useAuth()
  const [inviteCode, setInviteCode] = useState('')
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [refresh, setRefresh] = useState(false) // to trigger useFetch again

  // Refetch courses when refresh toggles
  const { data, error, isLoading } = useFetch(
    `/api/student/my-courses?refresh=${refresh}`
  )

  const handleRegister = async (e) => {
    e.preventDefault()
    setMessage('')
    setErrorMsg('')

    try {
      const res = await fetch('/api/student/register-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ inviteCode }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to register for course.')
      }

      setMessage('Successfully registered to the course!')
      setInviteCode('')
      setRefresh((prev) => !prev) // toggle to refetch courses
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Courses</h1>

      <form
        onSubmit={handleRegister}
        className="mb-6 flex flex-col md:flex-row gap-2 md:items-center"
      >
        <input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter invite code"
          className="border p-2 rounded-md flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      {isLoading && <p>Loading courses...</p>}
      {error && (
        <p className="text-red-500">
          Error: {error.message || 'Something went wrong.'}
        </p>
      )}

      <div className="grid gap-4">
        {data?.courses?.length > 0
          ? data.courses.map((course) => (
              <Link to={`/course/${course.id}`} key={course.id}>
                <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200">
                  <h2 className="text-lg font-medium">{course.title}</h2>
                </div>
              </Link>
            ))
          : !isLoading && <p>No courses found.</p>}
      </div>
    </div>
  )
}

export default StudentHomePage
