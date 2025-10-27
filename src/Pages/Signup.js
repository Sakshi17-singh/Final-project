import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // --- Validation function ---
  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_ ]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }

    if (!formValues.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = "Mobile number must be 10 digits long";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Form submission failed — please fix the errors!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          mobile: formValues.mobile,
          password: formValues.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Signup failed: ${data.detail || "Unknown error"}`);
        return;
      }

      alert("Signup successful!");
      console.log("User created:", data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="signup-container">
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          {formErrors.username && (
            <span className="error-message">{formErrors.username}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            name="mobile"
            value={formValues.mobile}
            onChange={handleInputChange}
          />
          {formErrors.mobile && (
            <span className="error-message">{formErrors.mobile}</span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <span className="error-message">{formErrors.password}</span>
          )}
        </div>

        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="toggle-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
