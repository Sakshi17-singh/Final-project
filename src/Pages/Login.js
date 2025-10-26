import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import "../App.css";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

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
      alert(data.message); // successful login
      setFormValues({ email: "", password: "" });
    } else {
      alert(data.detail || "Login failed!"); // backend error
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

