import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">    
      <form 
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
        </div>
        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
        </div>
        {/* Button */}
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 active:scale-95 transition transform"
        >
          Signup
        </button>
        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-2 border border-blue-500 text-blue-600 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignupPage;