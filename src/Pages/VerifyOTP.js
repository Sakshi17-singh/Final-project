import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react"; // Clerk hook
import "../App.css";

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { identifier } = location.state || {}; // email from previous page
  const { signIn, isLoaded } = useSignIn();   // Clerk hook

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return; // ensure Clerk is loaded

    try {
      setLoading(true);

      // Verify OTP and set new password via Clerk
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: otp,
        password: newPassword,
      });

      if (result.status === "complete") {
        alert("Password reset successfully!");
        navigate("/login"); // redirect to login page
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert(err.errors?.[0]?.message || "Invalid OTP or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Verify OTP</h2>
      <p>We’ve sent an OTP to <b>{identifier}</b></p>

      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Reset Password"}
        </button>
      </form>
    </div>
  );
}
