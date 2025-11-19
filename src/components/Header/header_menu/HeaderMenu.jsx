import React, { useState } from "react";
import "./HeaderMenu.css";
import { Link } from "react-router-dom";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";

import banner1 from "../../../assets/header/1.jpg";
import banner2 from "../../../assets/header/2.jpg";
import banner3 from "../../../assets/header/3.jpg";
import banner4 from "../../../assets/header/4.jpg";

const HeaderMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <div className="header-menu d-none d-lg-block sticky-nav shadow-sm">
        <div className="container">
          <ul className="main-menu d-flex align-items-center gap-4">

            <li className="active">
              <Link to="/">Home</Link>
            </li>

            {/* CATEGORIES MEGA MENU */}
            <li className="dropdown">
              <Link to="#">Categories</Link>

              <div className="mega-menu">
                <div className="mega-row">

                  <ul>
                    <li className="menu-title">Clothing</li>
                    <li><Link to="/clothing">Clothing</Link></li>
                    <li><Link to="/clothing-men">Clothing Men</Link></li>
                    <li><Link to="/clothing-women">Clothing Women</Link></li>
                  </ul>

                  <ul>
                    <li className="menu-title">Shoes</li>
                    <li><Link to="/shoes-men">Shoes Men</Link></li>
                    <li><Link to="/shoes-women">Shoes Women</Link></li>
                  </ul>

                  <ul>
                    <li className="menu-title">Accessories</li>
                    <li><Link to="/mobile">Mobile</Link></li>
                    <li><Link to="/laptop">Laptop</Link></li>
                    <li><Link to="/gamepad">Game Pad</Link></li>
                    <li><Link to="/tabs">Tabs</Link></li>
                  </ul>

                  <ul>
                    <li className="menu-title">Watches</li>
                    <li><Link to="/watch-men">Watches Men</Link></li>
                    <li><Link to="/watch-women">Watches Women</Link></li>
                  </ul>

                </div>

                {/* Banner Section */}
                <div className="mega-banner">
                  <img src={banner1} alt="" />
                  <img src={banner2} alt="" />
                  <img src={banner3} alt="" />
                  <img src={banner4} alt="" />
                </div>
              </div>
            </li>

            {/* NORMAL DROPDOWN */}
            <li className="dropdown">
              <Link to="#">Products</Link>
              <ul className="sub-menu">
                <li><Link to="/clothing">Clothing <FiChevronRight /></Link></li>
                <li><Link to="/shoes">Shoes <FiChevronRight /></Link></li>
                <li><Link to="/accessories">Accessories <FiChevronRight /></Link></li>
                <li><Link to="/watches">Watches <FiChevronRight /></Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="#">Pages</Link>
              <ul className="sub-menu">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="#">Blog</Link>
              <ul className="sub-menu">
                <li><Link to="/blog-men">Blog Men</Link></li>
                <li><Link to="/blog-women">Blog Women</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/offers" className="highlight-offer">Hot Offers</Link>
            </li>

          </ul>
        </div>
      </div>


      {/* ⭐ MOBILE MENU ⭐ */}
      <div className="mobile-header d-lg-none">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE SLIDING MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/clothing" onClick={() => setMenuOpen(false)}>Clothing</Link>
        <Link to="/shoes" onClick={() => setMenuOpen(false)}>Shoes</Link>
        <Link to="/mobile" onClick={() => setMenuOpen(false)}>Accessories</Link>
        <Link to="/watches" onClick={() => setMenuOpen(false)}>Watches</Link>
        <Link to="/offers" className="highlight-mobile" onClick={() => setMenuOpen(false)}>Hot Offers</Link>
      </div>
    </>
  );
};

export default HeaderMenu;
