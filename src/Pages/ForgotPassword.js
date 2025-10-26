import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState(""); // Email or phone number
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // Later, you’ll connect this to your backend + Clerk API
    alert("OTP has been sent successfully (mock alert for now)");
    navigate("/verify-otp", { state: { identifier } });
  };

  return (
    <div className="signup-container">
      <h2>Forgot Password</h2>
      <p>Enter your registered email or phone number to receive OTP.</p>

      <form onSubmit={handleSendOtp}>
        <div className="form-group">
          <label>Email or Phone</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="example@gmail.com or +9779XXXXXXX"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Send OTP
        </button>
      </form>
    </div>
  );
}
