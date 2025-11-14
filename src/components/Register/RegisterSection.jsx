import React from "react";
import "./RegisterSection.css";
import TopBanner from "../TopBanner/TopBanner";

export default function RegisterSection() {
  return (
    <>
    
     <section className="register-section">
      <div className="container">

        <div className="register-header">
          <h2 className="bg-title">Register</h2>
          <h2 className="main-title">Register</h2>
          <p className="sub-title">Best place to buy and sell digital products</p>
        </div>

        <div className="register-card">
          <form>

            <div className="grid">

              <div className="form-group half">
                <label>First Name*</label>
                <input type="text" placeholder="Enter your first name" required />
              </div>

              <div className="form-group half">
                <label>Last Name*</label>
                <input type="text" placeholder="Enter your last name" required />
              </div>

              <div className="form-group half">
                <label>Email*</label>
                <input type="email" placeholder="Enter your email..." required />
              </div>

              <div className="form-group half">
                <label>Phone Number*</label>
                <input type="text" placeholder="Enter your phone number" required />
              </div>

              <div className="form-group full">
                <label>Address</label>
                <input type="text" placeholder="Address Line 1" />
              </div>
                <div className="form-group full">
                <button className="submit-btn">Register</button>
              </div>

            </div>

          </form>
        </div>

      </div>
    </section>
    </>
   
   
  );
}
