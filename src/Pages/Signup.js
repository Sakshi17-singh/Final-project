import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    console.log("Validation Errors:", errors);

    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully!");
      console.log("Form Values:", formValues);
    } else {
      alert("Form submission failed — please fix the errors!");
      setFormErrors(errors);
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
