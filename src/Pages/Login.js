import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ This line is required
import "../App.css";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality not implemented yet!");
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formValues.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formValues.password} onChange={handleChange} />
          </div>
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
