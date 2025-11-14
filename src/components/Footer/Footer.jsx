import React from "react";
import "./Footer.css";

import logo from "../../assets/footer-logo.png";
import paymentImg from "../../assets/payment.png";

export default function Footer() {
  return (
    <footer className="footer">
      {/* TOP OFFER BAR */}
      <div className="footer-offer">
        <div className="container">
          <span>Win a contest! Get this limited-edition</span>
          <a href="#">View Detail</a>
        </div>
      </div>

      {/* FOOTER MAIN */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            {/* CONTACT */}
            <div className="footer-box">
              <img src={logo} alt="Logo" className="footer-logo" />
              <h4>Contact us</h4>
              <ul>
                <li>71 Pilgrim Avenue, East California</li>
                <li>
                  <span>Call Us: </span>
                  <a href="tel:+440123456789">+44 0123 456 789</a>
                </li>
                <li>
                  <span>Email: </span>
                  <a href="mailto:example@ec-email.com">example@ec-email.com</a>
                </li>
              </ul>
            </div>

            {/* INFORMATION */}
            <div className="footer-box">
              <h4>Information</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Delivery Information</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            {/* ACCOUNT */}
            <div className="footer-box">
              <h4>Account</h4>
              <ul>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Order History</a></li>
                <li><a href="#">Wish List</a></li>
                <li><a href="#">Specials</a></li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="footer-box">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Discount Returns</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Customer Service</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div className="footer-box">
              <h4>Newsletter</h4>
              <p>Get instant updates about new products & special promos!</p>

              <div className="newsletter">
                <input type="email" placeholder="Enter your email..." />
                <button>
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <div className="container footer-bottom-flex">

          <div className="social">
            <span>Follow us on:</span>
            <ul>
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>
          </div>

          <div className="copy">
            © 2025 <span>Ekka.</span> All Rights Reserved
          </div>

          <div>
            <img src={paymentImg} alt="Payment" className="payment-img" />
          </div>
        </div>
      </div>

    </footer>
  );
}
