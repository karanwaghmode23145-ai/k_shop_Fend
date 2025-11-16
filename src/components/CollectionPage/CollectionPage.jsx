import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./CollectionPage.css";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("");

  const [view, setView] = useState("grid");

  // FETCH FILTERED PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://k-shop-bend.vercel.app/api/products/filter", {
        params: {
          category,
          size,
          color,
          sort
        }
      });

      console.log("📥 FILTER API RESPONSE:", res.data);
      setProducts(res.data);

    } catch (err) {
      console.log("❌ API ERROR:", err);
    }
  };

  // FETCH ON FILTER CHANGE
  useEffect(() => {
    fetchProducts();
  }, [category, size, color, sort]);

  return (
    <div className="collection-page">

      {/* SIDEBAR FILTERS */}
      <aside className="sidebar">
        <h3>Filter Products By</h3>

        {/* CATEGORY */}
        <div className="filter-box">
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
            <option value="Watches">Watches</option>
          </select>
        </div>

        {/* SIZE */}
        <div className="filter-box">
          <h4>Size</h4>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        {/* COLOR */}
        <div className="filter-box">
          <h4>Color</h4>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">All</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Grey">Grey</option>
            <option value="Red">Red</option>
          </select>
        </div>

        {/* SORT */}
        <div className="filter-box">
          <h4>Sort By</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Latest</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* VIEW MODE */}
        <div className="filter-box view-mode">
          <h4>View Mode</h4>
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE PRODUCTS */}
      <main className="products">
        <h2>All Products</h2>

        <div className={`products-wrapper ${view}`}>
          {products.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            products.map((p) => (
              <ProductCard key={p._id} product={p} view={view} />
            ))
          )}
        </div>
      </main>

    </div>
  );
};

export default CollectionPage;
