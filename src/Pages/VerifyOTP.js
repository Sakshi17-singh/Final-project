import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { identifier } = location.state || {};
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      // Later: Verify OTP with backend (Clerk)
      alert("OTP verified successfully! Your password has been reset.");
      navigate("/login");
    } catch (err) {
      alert("Invalid OTP! Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Verify OTP</h2>
      <p>We sent an OTP to <b>{identifier}</b></p>

      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter the OTP"
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
        </div>

        <button type="submit" className="login-btn">
          Verify & Reset Password
        </button>
      </form>
    </div>
  );
}
