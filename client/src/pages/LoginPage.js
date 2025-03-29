import {useState} from 'react'

function LoginPage() {
     const [inputs, setInputs] = useState({})

     const handleChange = (event) => {
       const name = event.target.name
       const value = event.target.value
       setInputs((values) => ({ ...values, [name]: value }))
     }

     const handleSubmit = (event) => {
       event.preventDefault()
       alert(inputs)
     }
     
    return (
      <div>
        <h2> Login Page</h2>
        <form>
          <select name='role' value={inputs.role || '' } onChange={handleChange}>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <label>
            Enter your mail:
            <input
              type='text'
              name="mail"
              value={inputs.mail || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="pass"
              value={inputs.pass || ''}
              onChange={handleChange}
            />
          </label>
          <input type="submit" 
          onClick={handleSubmit}
          />
        </form>
      </div>
    )
}

export default LoginPage