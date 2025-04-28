import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

const Login = ({ onLoginSuccess, onSwitchToRegister }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
        onLoginSuccess();
      });
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login</h2>
          <p className="subtitle">Enter your credentials to access your account</p>
          {error && <p className="error-message">{error}</p>}
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <a href="#" className="text-button">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="register-link">
            Don't have an account?{" "}
            <button type="button" className="text-button" onClick={onSwitchToRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
