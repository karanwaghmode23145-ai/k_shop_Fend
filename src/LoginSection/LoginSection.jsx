import React, { useState } from "react";
import "./LoginSection.css";
import axiosClient from "../api/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginSection() {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return setLoading(false);
    }

    try {
      console.log("📤 Sending to backend:", formData);

      const res = await axiosClient.post("/api/users/login", formData);

      toast.success("Login Successful!");

      console.log("📥 Backend Response:", res.data);

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log("❌ Error:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer />

      <section className="login-section">
        <div className="container">

          <div className="login-header">
            <h2 className="main-title">Login</h2>
            <p className="sub-title">Welcome back! Please login</p>
          </div>

          <div className="login-card">
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter email" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button className="submit-btn" disabled={loading}>
                {loading ? "Checking..." : "Login"}
              </button>

            </form>
          </div>

        </div>
      </section>
    </>
  );
}
