import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle error if needed
    }
  };

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

      {/* Login Form */}
      <div className="max-w-md w-full mx-auto bg-white p-8 border rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={loginUser}>
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
            Login
          </button>
        </form>
        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign up here
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-blue-500">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}