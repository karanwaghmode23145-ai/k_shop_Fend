import React, { useState } from "react";
import "./RegisterSection.css";
import TopBanner from "../TopBanner/TopBanner";
import axiosClient from "../../api/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export default function RegisterSection() {
    
    // FORM STATES
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

   const [loading, setLoading] = useState(false);


   // INPUT CHANGE HANDLER
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


   // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔥 Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill all required fields!");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosClient.post("/api/users/register", formData);

      toast.success("Registration Successful!");

      console.log("📩 Backend Response:", response.data);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
      console.log("🔥 Error: ", error);
    }

    setLoading(false);
  };




  return (
    <>
    <TopBanner />
     <ToastContainer position="top-right" />

     <section className="register-section">
        <div className="container">

          <div className="register-header">
            <h2 className="bg-title">Register</h2>
            <h2 className="main-title">Register</h2>
            <p className="sub-title">Best place to buy and sell digital products</p>
          </div>

          <div className="register-card">
            <form onSubmit={handleSubmit}>
              <div className="grid">

                <div className="form-group half">
                  <label>First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group half">
                  <label>Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group half">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group half">
                  <label>Phone Number*</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group half">
                  <label>Password*</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address Line 1"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full">
                  <button className="submit-btn" disabled={loading}>
                    {loading ? "Processing..." : "Register"}
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </section>
    </>
   
   
  );
}
