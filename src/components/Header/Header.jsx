import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import HeaderMiddle from "./HeaderMiddle";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  // 🟢 SAFE SELECTOR — fallback [] so reduce kabhi error nahi dega
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">

            {/* Social Icons */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="header-top-social d-flex align-items-center gap-2">
                <ul className="social-list d-flex">
                  <li><a href="#"><FaFacebookF /></a></li>
                  <li><a href="#"><FaTwitter /></a></li>
                  <li><a href="#"><FaInstagram /></a></li>
                  <li><a href="#"><FaLinkedinIn /></a></li>
                </ul>
              </div>
            </div>

            {/* Center Message */}
            <div className="col-lg-4 col-12 text-center">
              <div className="header-top-message">
                <span className="highlight">Free Shipping</span> This Week Order Over - $75
              </div>
            </div>

            {/* Dropdowns */}
            <div className="col-lg-4 d-none d-lg-flex justify-content-end">
              <div className="header-top-lan-curr d-flex gap-4">

                <div className="dropdown">
                  <button className="dropdown-toggle">
                    Currency <IoChevronDown />
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#">USD $</a></li>
                    <li><a href="#">EUR €</a></li>
                  </ul>
                </div>

                <div className="dropdown">
                  <button className="dropdown-toggle">
                    Language <IoChevronDown />
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#">English</a></li>
                    <li><a href="#">Italiano</a></li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Middle + Menu */}
      <HeaderMiddle cartCount={cartCount} />
      <HeaderMenu />
    </>
  );
};

export default Header;
