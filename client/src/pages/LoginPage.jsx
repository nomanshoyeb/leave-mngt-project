import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative">
      <form 
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition transform"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?
        </p>
        <button
          type="button"
          className="w-full mt-2 border border-green-500 text-green-600 py-2 rounded-lg hover:bg-green-500 hover:text-white transition"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </form>

    </div>
  );
}


export default LoginPage;