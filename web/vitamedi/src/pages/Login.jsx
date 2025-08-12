import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ correct import
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (!res.data.token) {
        throw new Error("No token received");
      }

      // ✅ Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Decode token to get role
      let role = "";
      try {
        const decoded = jwtDecode(res.data.token);
        role = decoded?.role || "";
      } catch (decodeErr) {
        console.error("Token decoding failed:", decodeErr);
      }

      // ✅ Redirect based on role
      if (role === "doctor") {
        navigate("/doctor-home");
      } else {
        navigate("/profile"); // Normal user route
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MediLink</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Don't have an account?</p>
          <a
            href="/signup"
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-0">
        {/* Left Side */}
        <div className="hidden md:block md:w-1/2 lg:w-2/5 px-8 mb-10 md:mb-0">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-teal-50 opacity-40 blur-3xl"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl p-8 shadow-lg">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                    <MdPerson className="text-white text-4xl" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Welcome Back
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Sign in to access your personalized healthcare dashboard and
                  manage your appointments.
                </p>
                <div className="flex justify-center">
                  <img
                    src="https://source.unsplash.com/400x300/?healthcare,login"
                    alt="Healthcare"
                    className="rounded-2xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Secure Access
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="text-gray-400 text-xl" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLock className="text-gray-400 text-xl" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-medium hover:shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
