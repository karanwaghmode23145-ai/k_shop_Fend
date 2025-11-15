import React from "react";
import "./HeaderMiddle.css";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png";

const HeaderMiddle = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="header-middle d-none d-lg-block">
      <div className="container position-relative">
        <div className="row">
          <div className="ec-flex d-flex align-items-center justify-content-between w-100">

            {/* Logo */}
            <div className="header-logo">
              <a href="/"><img src={logo} alt="Site Logo" /></a>
            </div>

            {/* Search Bar */}
            <div className="header-search">
              <form className="search-form">
                <input type="text" placeholder="Search products..." className="search-input" />
                <button type="submit" className="search-btn">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Icons */}
            <div className="header-icons d-flex align-items-center gap-4">

              {/* User / Login / Logout */}
              <div className="header-user">
                {user ? (
                  <div className="d-flex align-items-center gap-3">

                    <button
                      className="icon-btn"
                      onClick={() => window.location.href = "/profile"}
                    >
                      <FaUser />
                      <span className="username">{user.firstName}</span>
                    </button>

                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>

                  </div>
                ) : (
                  <button className="icon-btn" onClick={() => window.location.href = "/login"}>
                    <FaUser />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <div className="header-wishlist position-relative">
                <button className="icon-btn"><FaHeart /></button>
                <span className="badge">4</span>
              </div>

              {/* Cart */}
              <div className="header-cart position-relative">
                <button className="icon-btn"><FaShoppingBag /></button>
                <span className="badge">3</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
