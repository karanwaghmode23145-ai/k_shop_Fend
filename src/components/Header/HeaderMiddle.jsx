import React from "react";
import "./HeaderMiddle.css";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderMiddle = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* ⭐ CART COUNT */
  const cartItems = useSelector((state) => state.cart.items || []);

  const cartCount = cartItems.reduce((sum, item) => {
    return sum + (item.qty || item.quantity || 0);
  }, 0);

  /* ⭐ WISHLIST COUNT */
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const wishlistCount = wishlistItems.length;

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
              <Link to="/">
                <img src={logo} alt="Site Logo" />
              </Link>
            </div>

            {/* Search */}
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
                <Link to="/wishlist" className="icon-btn">
                  <FaHeart />
                  <span className="wishlist-badge">{wishlistCount}</span>
                </Link>
              </div>

              {/* Cart */}
              <div className="header-cart position-relative">
                <Link to="/cart" className="cart-link">
                  <FaShoppingBag />
                  <span className="cart-badge">{cartCount}</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
