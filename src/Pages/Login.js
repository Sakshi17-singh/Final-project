import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login successful!");
        setFormValues({ email: "", password: "" });
        navigate("/home"); // redirect to home after login
      } else {
        alert(data.detail || "Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("Server connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password link */}
        <p style={{ marginTop: "10px" }}>
          <button
            type="button"
            className="toggle-link"
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </p>
        <p style={{ marginTop: "10px" }}>
  <button
    type="button"
    className="toggle-link"
    style={{
      background: "none",
      border: "none",
      color: "#007bff",
      textDecoration: "underline",
      cursor: "pointer",
    }}
    onClick={() => navigate("/verify-otp")}
  >
    Login with OTP
  </button>
</p>


        {/* Signup link */}
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="toggle-link">
            Signup
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
