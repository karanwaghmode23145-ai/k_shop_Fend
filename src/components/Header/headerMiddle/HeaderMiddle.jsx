import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FaUser, FaHeart, FaShoppingBag, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../assets/logo.png";

import "./HeaderMiddle.css";

const HeaderMiddle = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 0), 0);
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="header-middle py-3">
      <div className="container">
        <div className="row align-items-center justify-content-between">

          {/* LOGO */}
          <div className="col-auto d-flex align-items-center gap-3">
            <button className="mobile-menu-btn d-lg-none" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="header-logo" />
            </Link>
          </div>

          {/* SEARCH BAR (hidden on mobile) */}
          <div className="col-md-5 d-none d-lg-block">
            <div className="search-box">
              <input type="text" placeholder="Search products..." className="form-control search-input" />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* ICON SECTION */}
          <div className="col-auto d-flex align-items-center gap-4 header-icons">

            {/* USER */}
            {token ? (
              <div className="d-flex align-items-center gap-3">
                <button className="icon-btn" onClick={() => navigate("/profile")}>
                  <FaUser />
                  <span className="username d-none d-md-inline">{user?.firstName}</span>
                </button>

                <button className="logout-btn d-none d-md-inline" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="icon-btn" onClick={() => navigate("/login")}>
                <FaUser />
              </button>
            )}

            {/* WISHLIST */}
            <Link to="/wishlist" className="icon-btn position-relative">
              <FaHeart />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </Link>

            {/* CART */}
            <Link to="/cart" className="icon-btn position-relative">
              <FaShoppingBag />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>

            {/* MOBILE SEARCH ICON */}
            <button className="icon-btn d-lg-none">
              <FaSearch />
            </button>

          </div>
        </div>
      </div>

      {/* ⭐ MOBILE MENU OVERLAY */}
      {mobileMenu && (
        <div className="mobile-nav d-lg-none">
          <Link to="/" className="mobile-link" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/wishlist" className="mobile-link" onClick={() => setMobileMenu(false)}>Wishlist</Link>
          <Link to="/cart" className="mobile-link" onClick={() => setMobileMenu(false)}>Cart</Link>

          {token ? (
            <>
              <button className="mobile-btn" onClick={() => navigate("/profile")}>
                My Profile
              </button>
              <button className="mobile-btn logout-mobile" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="mobile-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderMiddle;
