import React from "react";
import { Link } from "react-router-dom";
import "./BannerSection.css";

import twob from "../../../assets/2.jpg";
import two from "../../../assets/2_b.jpg";

export default function BannerSection() {
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-grid">

          {/* LEFT BANNER → MEN SHOES */}
          <Link to="/collection?category=Shoes" className="banner-card">
            <img src={twob} alt="banner" className="banner-img" />

            <div className="banner-text">
              <span className="sub-title">New Arrivals</span>
              <h3 className="title">
                mens <br /> Sport shoes
              </h3>
              <p className="discount">30% Discount</p>
              <button className="btn">Shop Shoes</button>
            </div>
          </Link>

          {/* RIGHT BANNER → WATCHES */}
          <Link to="/collection?category=Watches" className="banner-card">
            <img src={two} alt="banner" className="banner-img" />

            <div className="banner-text">
              <span className="sub-title">New Trending</span>
              <h3 className="title">
                Smart <br /> watches
              </h3>
              <p className="discount">Buy any 3 Items & get 20% Discount</p>
              <button className="btn">Shop Watches</button>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
