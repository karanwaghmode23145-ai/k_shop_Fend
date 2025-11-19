import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  /* 🔥 Fetch Updated Profile (if stored in DB) */
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  /* 🔄 Handle Input Change */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* 💾 Save Profile */
  const handleSave = async () => {
    try {
      await axiosClient.put("/api/users/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("user", JSON.stringify(profile));
      toast.success("✔ Profile Updated Successfully!");
    } catch (err) {
      toast.error("❌ Failed to update profile");
    }
  };

  /* 🚪 Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out!");
    navigate("/login");
  };

  return (
    <div className="profile container">

      {/* HEADER */}
      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <p>Manage your account details and preferences</p>
      </div>

      {/* MAIN CARD */}
      <div className="profile-card">

        <h3>Personal Details</h3>

        <input type="text" name="fullName" placeholder="Full Name" value={profile.fullName} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={profile.phone} onChange={handleChange} />

        <h3 className="mt-4">Address Details</h3>

        <textarea name="address" placeholder="Address" value={profile.address} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={profile.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={profile.state} onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" value={profile.pincode} onChange={handleChange} />

        <button className="save-btn" onClick={handleSave}>Save Changes</button>

        <Link to="/my-orders" className="orders-btn">View My Orders →</Link>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>

      </div>

    </div>
  );
};

export default ProfilePage;
