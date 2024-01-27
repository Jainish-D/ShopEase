import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  
  const loginUser = async (e) => {
    e.preventDefault()
     const {email, password} = data
     try {
      const {data} = await axios.post('/login', {
        email,
        password
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({});
        navigate('/dashboard')
      }
     } catch (error) {
      
     }
  }
  
  return (
    <div>
      <form onSubmit={loginUser}>
        <label to='/'>Email</label>
        <input type='email' placeholder='Enter Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label to='/'>Password</label>
        <input type='password' placeholder='Enter Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type='submit'>Login</button>
      </form>

      <div className="grid">
        <Link to='/register' className="text-blue-500">Forgot your password?</Link>
        <Link to='/register' className="text-blue-500">New customer? Sign up for an account</Link>
      </div>

    </div>
  )
}
