import React from "react";
import "./HeaderMiddle.css";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png";


const HeaderMiddle = () => {
  return (
    <div className="header-middle d-none d-lg-block">
      <div className="container position-relative">
        <div className="row">
          <div className="ec-flex d-flex align-items-center justify-content-between w-100">

            {/* Logo */}
            <div className="header-logo">
              <a href="/">
                <img src={logo} alt="Site Logo" />
              </a>
            </div>

            {/* Search Bar */}
            <div className="header-search">
              <form className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* User, Wishlist, Cart Icons */}
            <div className="header-icons d-flex align-items-center gap-4">

              <div className="header-user">
                <button className="icon-btn">
                  <FaUser />
                </button>
              </div>

              <div className="header-wishlist position-relative">
                <button className="icon-btn">
                  <FaHeart />
                </button>
                <span className="badge">4</span>
              </div>

              <div className="header-cart position-relative">
                <button className="icon-btn">
                  <FaShoppingBag />
                </button>
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
