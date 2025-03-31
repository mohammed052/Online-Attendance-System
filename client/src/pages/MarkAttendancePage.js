import React, { useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useFetch from '../useFetch'

const MarkAttendance = () => {
  const { id } = useParams()
  const {
    data: course,
    error,
    isLoading,
  } = useFetch('api/course/' + id)
  const navigate = useNavigate()

  const HandleDelete = () => {
    fetch('http://localhost:8000/courses/' + course.id, {
      method: 'DELETE',
    }).then(() => {
      navigate('/teacher')
    })
  }

  const [photo, setPhoto] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      videoRef.current.play()
      setIsCameraOpen(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera.')
    }
  }

  const takePhoto = () => {
    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const photoData = canvas.toDataURL('image/png')
    setPhoto(photoData)

    const stream = video.srcObject
    const tracks = stream.getTracks()
    tracks.forEach((track) => track.stop())
    video.srcObject = null
  }

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhoto(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="attendance-page container">
      <div>
        {isLoading && <div>Loading.... </div>}
        {error && <div>{error.message} </div>}
        {course && (
          <div>
            <h2>
              {/* <span>
                {course.batch} - {course.courseName}
              </span> */}
                <span>{course.title}</span>
            </h2>
          </div>
        )}
      </div>
      <div className="attendance-section">
        <h3>Take Attendance</h3>
        {!photo ? (
          <>
            <button onClick={openCamera} className="button">
              📸 Open Camera
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="input"
            />
            <div>
              <video ref={videoRef} className="video" autoPlay></video>
              {isCameraOpen && (
                <button onClick={takePhoto} className="button">
                  Capture Photo
                </button>
              )}
            </div>
          </>
        ) : (
          <div>
            <h3>Selected Photo</h3>
            <img src={photo} alt="Captured or Uploaded" className="photo" />
            <button
              onClick={() => {
                setPhoto(null)
                setIsCameraOpen(false)
              }}
              className="button button-secondary"
            >
              Reset
            </button>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
      <Link to="/teacher" className="button button-secondary">
        Back
      </Link>
      <button onClick={HandleDelete} className="button button-secondary">
        Delete Course
      </button>
    </div>
  )
}

export default MarkAttendance
