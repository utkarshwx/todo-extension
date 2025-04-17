import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://todo.heapmind.com/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      chrome.storage.local.set({ token, user }, () => {
        onLogin(); // Let Popup know we're logged in
      });
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8">
          <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Enter your credentials to access your account</p>
          {error && <p className="mt-2 text-center text-sm text-red-500 font-bold">{error}</p>}
        </div>

        <div className="px-6 pb-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 flex h-full items-center px-3 text-gray-400 hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            {/* Register Link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button className="font-medium text-blue-600 hover:underline">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
{/* 
      <div className="p-4 w-[250px]">
        <h2 className="text-lg font-semibold mb-2">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        
      </div> */}

    </>
  );
};

export default Login;
