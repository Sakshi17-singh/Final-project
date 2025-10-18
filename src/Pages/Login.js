import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import "../App.css";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormError(""); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple frontend validation
    if (!formValues.email || !formValues.password) {
      setFormError("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // successful login
        setFormValues({ email: "", password: "" });
      } else {
        alert(data.detail || "Login failed!");
      }
    } catch (err) {
      alert("Error connecting to server!");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formValues.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formValues.password} 
              onChange={handleChange} 
              placeholder="Enter your password"
            />
          </div>
          {formError && <span className="error-message">{formError}</span>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup" className="toggle-link">Signup</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
