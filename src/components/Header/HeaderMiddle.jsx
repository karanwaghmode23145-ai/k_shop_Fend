import React from "react";
import "./HeaderMiddle.css";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

const HeaderMiddle = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");

  // 🟢 SAFE CART SELECTOR
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

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

            {/* Search */}
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

              {/* User */}
              <div className="header-user">
                {token ? (
                  <div className="d-flex align-items-center gap-3">
                    <button className="icon-btn">
                      <FaUser />
                      <span className="username">{user?.firstName}</span>
                    </button>

                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    className="icon-btn"
                    onClick={() => (window.location.href = "/login")}
                  >
                    <FaUser />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <div className="header-wishlist position-relative">
                <a href="/wishlist" className="icon-btn">
                  <FaHeart />
                </a>
              </div>

              {/* Cart */}
              <div className="header-cart position-relative">
                <a href="/cart" className="cart-link">
                  <FaShoppingBag />  
                  <span className="cart-badge">{cartCount}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
