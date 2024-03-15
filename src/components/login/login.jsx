import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      const { token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(data));
      setError(null);
      navigate("/main");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div>
          <h2 className="login-title">Sign in to your account</h2>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="login-inputs">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <div className="login-options">
            <div className="login-remember">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="login-checkbox"
              />
              <label htmlFor="remember-me" className="login-remember-label">
                Remember me
              </label>
            </div>

            <div className="login-forgot">
              <a href="#" className="login-forgot-link">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
