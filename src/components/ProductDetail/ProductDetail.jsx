import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css"; // styling file

const ProductDetail = () => {
  const productId = window.location.pathname.split("/").pop();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5003/api/products/${productId}`);
        setProduct(res.data);
        setActiveImage(res.data.thumbnail || res.data.images[0]);
      } catch (err) {
        console.log("❌ Product Error:", err);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="loading">Loading Product Details...</p>;
  if (!product) return <p className="error">Product Not Found!</p>;

  return (
    <div className="product-detail container">

      {/* ==== IMAGES ==== */}
      <div className="image-section">

        {/* Main Image */}
        <div className="main-image">
          <img src={activeImage} alt={product.title} />
        </div>

        {/* Thumbnail List */}
        <div className="thumb-list">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              className={activeImage === img ? "active" : ""}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      {/* ==== PRODUCT INFO ==== */}
      <div className="info-section">

        <h2 className="title">{product.title}</h2>

        {/* Rating */}
        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className={`fa fa-star ${i < (product.rating || 4) ? "active" : ""}`}></i>
          ))}
          <span className="reviews">{product.numReviews} Reviews</span>
        </div>

        {/* Price */}
        <div className="price-box">
          <span className="price">₹{product.price}</span>
          {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
          {product.discountPercent > 0 && (
            <span className="discount">-{product.discountPercent}%</span>
          )}
        </div>

        {/* Stock */}
        <p className="stock">
          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Size */}
        {product.size.length > 0 && (
          <div className="size-box">
            <h4>Select Size:</h4>
            <div className="size-list">
              {product.size.map((s, i) => (
                <span key={i} className="size-item">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Color */}
        {product.color.length > 0 && (
          <div className="color-box">
            <h4>Select Color:</h4>
            <div className="color-list">
              {product.color.map((c, i) => (
                <span key={i} className="color-item">{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="description">
          <h4>Description:</h4>
          <p>{product.description || product.shortDescription}</p>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button className="add-cart">Add to Cart</button>
          <button className="wishlist">❤️ Wishlist</button>
        </div>

        {/* Extra Info */}
        <div className="meta">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
        </div>

      </div>

    </div>
  );
};

export default ProductDetail;
