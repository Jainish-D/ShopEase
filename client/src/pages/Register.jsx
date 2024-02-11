import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data
    try {
      const { data } = await axios.post('/register', {
        name, email, password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Registration Successful. Please log in.')
        navigate('/login') // sends user to login page after successful registration
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-blue-200 h-screen">
      {/* Navigation Bar */}
      <div className="w-full bg-white p-4 mb-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">ShopEase</h1>
          <Link
            to="/"
            className="rounded border border-blue-500 p-2 text-blue-500 hover:bg-blue-100 focus:outline-none focus:underline"
          >
            Homepage
          </Link>
        </div>
      </div>

      {/* Register Form */}
      <div className="max-w-md w-full mx-auto bg-white p-8 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}