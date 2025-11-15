import React, { useEffect, useState } from "react";
import "./ProductSection.css";
import axios from "axios";
import { Link } from "react-router-dom"; // ⭐ Add this

const tabs = [
  { key: "newArrival", label: "New Arrivals" },
  { key: "bestSeller", label: "Best Sellers" },
  { key: "saleItems", label: "Sale Items" },
];

// ⭐ Product Card
function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-link">   {/* ⭐ FULL CLICKABLE */}
      <div className="product-card">

        <div className="img-box">
          <img
            src={product.thumbnail}
            className="default-img"
            alt={product.title}
          />

          {/* Hover Image */}
          {product.images?.length > 1 && (
            <img
              src={product.images[1]}
              className="hover-img"
              alt={product.title}
            />
          )}

          {/* Badges */}
          {(product.discountPercent > 0 || product.isFeatured) && (
            <div className="badges">
              {product.discountPercent > 0 && (
                <span className="pink">-{product.discountPercent}%</span>
              )}
              {product.isFeatured && <span className="purple">New</span>}
            </div>
          )}

          {/* Buttons */}
          <div className="actions">
            <button title="Wishlist"><i className="pe-7s-like"></i></button>
            <button title="Add to Cart"><i className="pe-7s-cart"></i></button>
            <button title="Quick View"><i className="pe-7s-look"></i></button>
          </div>
        </div>

        <div className="content">
          <h4>{product.title}</h4>

          {/* Rating */}
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`fa fa-star-o ${
                  i < (product.rating || 4) ? "yellow" : ""
                }`}
              ></i>
            ))}
          </div>

          {/* Price */}
          <div className="price">
            <span>₹{product.price}</span>
            {product.oldPrice && <span className="old">₹{product.oldPrice}</span>}
          </div>
        </div>

      </div>
    </Link>
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

  // 🔥 Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get("https://k-shop-bend.vercel.app/api/products");
        const all = res.data;

        console.log("🔥 All Products:", all);

        setProducts({
          newArrival: all.filter((p) => p.isFeatured === true),
          bestSeller: all.filter((p) => p.sold > 5 || p.discountPercent > 20),
          saleItems: all.filter((p) => p.discountPercent > 0),
        });

      } catch (err) {
        console.log("❌ Error fetching:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="product-section">
      <div className="container">

        <h2 className="section-title">DAILY DEALS!</h2>

        {/* Tabs */}
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

        {/* Products */}
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="grid new">
            {products[active].slice(0, 9).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
