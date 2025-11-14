import React from "react";
import "./HeaderMenu.css";
import { FiGrid, FiChevronRight } from "react-icons/fi";

const HeaderMenu = () => {
  return (
    <div className="header-menu d-none d-lg-block sticky-nav">
      <div className="container position-relative">
        <div className="row">
          <div className="col-md-12 align-self-center">
            <div className="menu-wrapper">

              {/* Sidebar Toggle */}
              <button className="sidebar-toggle">
                <FiGrid />
              </button>

              <ul className="main-menu">
                <li className="active"><a href="#">Home</a></li>

                {/* Categories Mega Menu */}
                <li className="dropdown">
                  <a href="#">Categories</a>

                  <div className="mega-menu">
                    <div className="mega-row">

                      <ul>
                        <li className="menu-title">Classic Variation</li>
                        <li><a href="#">Left sidebar 3 column</a></li>
                        <li><a href="#">Left sidebar 4 column</a></li>
                        <li><a href="#">Right sidebar 3 column</a></li>
                        <li><a href="#">Right sidebar 4 column</a></li>
                        <li><a href="#">Full width 4 column</a></li>
                      </ul>

                      <ul>
                        <li className="menu-title">Banner Layout</li>
                        <li><a href="#">Banner left sidebar 3 column</a></li>
                        <li><a href="#">Banner left sidebar 4 column</a></li>
                        <li><a href="#">Banner right sidebar 3 column</a></li>
                        <li><a href="#">Banner full width</a></li>
                      </ul>

                      <ul>
                        <li className="menu-title">Columns Variation</li>
                        <li><a href="#">3 Columns full width</a></li>
                        <li><a href="#">4 Columns full width</a></li>
                        <li><a href="#">5 Columns full width</a></li>
                        <li><a href="#">6 Columns full width</a></li>
                      </ul>

                      <ul>
                        <li className="menu-title">List Variation</li>
                        <li><a href="#">Shop left sidebar</a></li>
                        <li><a href="#">Shop right sidebar</a></li>
                        <li><a href="#">Banner left sidebar</a></li>
                        <li><a href="#">Banner right sidebar</a></li>
                      </ul>

                    </div>

                    {/* Mega Menu Banners */}
                    <div className="mega-banner">
                      <img src="/assets/menu/banner1.jpg" alt="banner1" />
                      <img src="/assets/menu/banner2.jpg" alt="banner2" />
                      <img src="/assets/menu/banner3.jpg" alt="banner3" />
                      <img src="/assets/menu/banner4.jpg" alt="banner4" />
                    </div>

                  </div>
                </li>

                {/* Products Dropdown */}
                <li className="dropdown">
                  <a href="#">Products</a>
                  <ul className="sub-menu">
                    <li><a href="#">Product left sidebar <FiChevronRight /></a></li>
                    <li><a href="#">Product right sidebar <FiChevronRight /></a></li>
                    <li><a href="#">Product video <FiChevronRight /></a></li>
                    <li><a href="#">Product gallery <FiChevronRight /></a></li>
                    <li><a href="#">Full width</a></li>
                  </ul>
                </li>

                {/* Pages */}
                <li className="dropdown">
                  <a href="#">Pages</a>
                  <ul className="sub-menu">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Cart</a></li>
                    <li><a href="#">Checkout</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                  </ul>
                </li>

                {/* Blog */}
                <li className="dropdown">
                  <a href="#">Blog</a>
                  <ul className="sub-menu">
                    <li><a href="#">Blog left sidebar</a></li>
                    <li><a href="#">Blog right sidebar</a></li>
                    <li><a href="#">Blog full width</a></li>
                  </ul>
                </li>

                {/* Elements */}
                <li className="dropdown">
                  <a href="#">Elements</a>
                  <ul className="sub-menu">
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Typography</a></li>
                    <li><a href="#">Buttons</a></li>
                    <li><a href="#">Tabs</a></li>
                  </ul>
                </li>

                <li><a href="#">Hot Offers</a></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
