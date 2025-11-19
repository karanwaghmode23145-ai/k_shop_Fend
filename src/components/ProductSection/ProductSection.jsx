import React, { useEffect, useState } from "react";
import "./ProductSection.css";
import axios from "axios";
import { Link } from "react-router-dom";

const tabs = [
  { key: "newArrival", label: "New Arrivals" },
  { key: "bestSeller", label: "Best Sellers" },
  { key: "saleItems", label: "Sale Items" },
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="img-box">
        <img src={product.thumbnail} className="default-img" alt={product.title} />

        {product.images?.length > 1 && (
          <img src={product.images[1]} className="hover-img" alt={product.title} />
        )}

        {(product.discountPercent > 0 || product.isFeatured) && (
          <div className="badges">
            {product.discountPercent > 0 && <span className="pink">-{product.discountPercent}%</span>}
            {product.isFeatured && <span className="purple">New</span>}
          </div>
        )}
      </Link>

      <div className="content">
        <h4>{product.title}</h4>

        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className={`fa fa-star ${i < (product.rating || 4) ? "yellow" : ""}`} />
          ))}
        </div>

        <div className="price">
          <span>₹{product.price}</span>
          {product.oldPrice && <span className="old">₹{product.oldPrice}</span>}
        </div>

        <div className="actions">
          <Link to="/wishlist" className="action-btn">♡</Link>
          <Link to="/cart" className="action-btn">🛒</Link>
          <Link to={`/product/${product._id}`} className="action-btn">👁</Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductSection() {
  const [active, setActive] = useState("newArrival");
  const [products, setProducts] = useState({
    newArrival: [],
    bestSeller: [],
    saleItems: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get("https://k-shop-bend.vercel.app/api/products");
        const all = res.data;

        setProducts({
          newArrival: all.filter((p) => p.isFeatured),
          bestSeller: all.filter((p) => p.sold > 5 || p.discountPercent > 20),
          saleItems: all.filter((p) => p.discountPercent > 0),
        });
      } catch (err) {
        console.log("❌ Error:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

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

        {loading ? (
          <div className="loader-wrapper">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="grid">
            {products[active].slice(0, 9).map((p) => (   // ⭐ Updated here
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
