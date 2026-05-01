import { useState } from "react"
import { LogInUser } from "../../services/auth"
import { useNavigate } from "react-router-dom"
import "../../assets/style/auth.css";


const Login = ({ setUser }) => {
  const Navigate = useNavigate()
  const initValues = {
    email: "",
    password: "",
  }

  const [loginInfo, setInfo] = useState(initValues)

  const handleChange = (event) => {
    setInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await LogInUser(loginInfo)
    setUser(response)
    setInfo(initValues)
    Navigate("/dashboard")
  }
  return (
    <div className="form-container dark">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={loginInfo.email}
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          placeholder="Enter Your Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
