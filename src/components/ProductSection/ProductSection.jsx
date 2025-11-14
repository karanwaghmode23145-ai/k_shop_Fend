import React, { useState } from "react";
import "./ProductSection.css";


import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const tabs = [
  { key: "newArrival", label: "New Arrivals" },
  { key: "bestSeller", label: "Best Sellers" },
  { key: "saleItems", label: "Sale Items" },
];

// ⭐ DUMMY DATA (4 products in each tab)
const productData = {
  newArrival: [
    {
      id: 1,
      title: "Trendy Winter Jacket",
      price: "€10.47",
      oldPrice: "€17.45",
      badge: ["-40%", "New"],
      img: img3,
      hoverImg: img3,
      rating: 5,
    },
    {
      id: 2,
      title: "New Men's Coat",
      price: "€15.50",
      badge: ["New"],
      img: img4,
      hoverImg: img4,
      rating: 4,
    },
    {
      id: 3,
      title: "Women's Stylish Coat",
      price: "€22.95",
      oldPrice: "€25.50",
      badge: ["-10%"],
      img: img5,
      hoverImg: img5,
      rating: 5,
    },
    {
      id: 4,
      title: "Modern Winter Jacket",
      price: "€19.85",
      badge: ["New"],
      img: img6,
      hoverImg: img6,
      rating: 5,
    },
  ],

  bestSeller: [
    {
      id: 5,
      title: "Female Top Style",
      price: "€35.6",
      badge: [],
      img: img4,
      hoverImg: img3,
      rating: 4,
    },
    {
      id: 6,
      title: "Fashion Jacket",
      price: "€26.87",
      oldPrice: "€29.85",
      badge: ["-10%"],
      img: img4,
      hoverImg: img4,
      rating: 5,
    },
    {
      id: 7,
      title: "Kids Winter Coat",
      price: "€26.87",
      oldPrice: "€29.85",
      badge: ["-10%"],
      img: img3,
      hoverImg: img3,
      rating: 5,
    },
    {
      id: 8,
      title: "Stylish Men's Jacket",
      price: "€19.85",
      badge: ["New"],
      img: img3,
      hoverImg: img3,
      rating: 5,
    },
  ],

  saleItems: [
    {
      id: 9,
      title: "Black Leather Jacket",
      price: "€11.2",
      oldPrice: "€12.45",
      badge: ["-10%"],
      img: img3,
      hoverImg: img3,
      rating: 4,
    },
    {
      id: 10,
      title: "Winter Long Coat",
      price: "€15.72",
      oldPrice: "€18.50",
      badge: ["-15%"],
      img: img4,
      hoverImg: img4,
      rating: 3,
    },
    {
      id: 11,
      title: "Casual Warm Jacket",
      price: "€10.47",
      oldPrice: "€17.45",
      badge: ["-40%", "New"],
      img: img4,
      hoverImg: img4,
      rating: 5,
    },
    {
      id: 12,
      title: "Women's Stylish Coat",
      price: "€22.95",
      oldPrice: "€25.50",
      badge: ["-10%"],
      img: img4,
      hoverImg: img3,
      rating: 5,
    },
  ],
};

// ⭐ Product Card Component
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="img-box">
        <img src={product.img} className="default-img" alt={product.title} />
        <img src={product.hoverImg} className="hover-img" alt={product.title} />

        {product.badge?.length > 0 && (
          <div className="badges">
            {product.badge.map((b, index) => (
              <span key={index} className={b.includes("%") ? "pink" : "purple"}>
                {b}
              </span>
            ))}
          </div>
        )}

        <div className="actions">
          <button title="Wishlist">
            <i className="pe-7s-like"></i>
          </button>
          <button title="Add to Cart">
            <i className="pe-7s-cart"></i>
          </button>
          <button title="Quick View">
            <i className="pe-7s-look"></i>
          </button>
        </div>
      </div>

      <div className="content">
        <h4>{product.title}</h4>

        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`fa fa-star-o ${i < product.rating ? "yellow" : ""}`}
            ></i>
          ))}
        </div>

        <div className="price">
          <span>{product.price}</span>
          {product.oldPrice && <span className="old">{product.oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}

export default function ProductSection() {
  const [active, setActive] = useState("newArrival");

  return (
    <div className="product-section">
      <div className="container">
        <h2 className="section-title">DAILY DEALS!</h2>

        <div className="tab-list">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={active === tab.key ? "active" : ""}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SHOW ONLY 4 PRODUCTS */}
        <div className="grid">
          {productData[active].slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
