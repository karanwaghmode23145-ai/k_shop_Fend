import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { addToCartBackend } from "../../slices/cartSlice";
import { addToWishlistBackend } from "../../slices/wishlistSlice";

import ProductTabs from "../ProductTabs/ProductTabs";
import RelatedProductsSection from "../RelatedProducts/RelatedProductsSection";

import "./ProductDetail.css";

const ProductDetail = () => {
  const productId = window.location.pathname.split("/").pop(); // ya useParams bhi use kar sakte ho
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ⭐ ADD TO CART */
  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(addToCartBackend({ productId: product._id, qty: 1 }));
    console.log("🛒 Added to Cart:", product.title);
  };

  /* ⭐ ADD TO WISHLIST */
  const handleWishlist = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(addToWishlistBackend({ productId: product._id }));
    console.log("💛 Added to Wishlist:", product.title);
  };

  /* ⭐ Load Product */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://k-shop-bend.vercel.app/api/products/${productId}`
        );
        const data = res.data;
        setProduct(data);
        setActiveImage(data.thumbnail || data.images?.[0] || "");
      } catch (err) {
        console.log("❌ Product Load Error:", err);
      }
      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="detail-loader-wrapper">
        <div className="detail-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found container">
        <h3>Product Not Found</h3>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="product-detail container">
        {/* Breadcrumb */}
        <div className="breadcrumb-row">
          <Link to="/">Home</Link>
          <span>/</span>
          {product.category && <span>{product.category}</span>}
          {product.subcategory && (
            <>
              <span>/</span>
              <span>{product.subcategory}</span>
            </>
          )}
          <span>/</span>
          <span className="current">{product.title}</span>
        </div>

        <div className="row product-main">
          {/* =============== LEFT IMAGES =============== */}
          <div className="col-lg-6 col-md-12">
            <div className="gallery-wrapper">
              <div className="main-image-box">
                <img src={activeImage} className="main-image" alt={product.title} />
                {product.discountPercent > 0 && (
                  <span className="badge-discount">
                    -{product.discountPercent}%
                  </span>
                )}
                {product.isFeatured && (
                  <span className="badge-featured">Featured</span>
                )}
              </div>

              {product.images?.length > 0 && (
                <div className="thumb-list">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className={`thumb-img ${
                        activeImage === img ? "active" : ""
                      }`}
                      onClick={() => setActiveImage(img)}
                      alt={`thumb-${i}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* =============== RIGHT INFO =============== */}
          <div className="col-lg-6 col-md-12">
            <div className="info-wrapper">
              {product.brand && (
                <p className="brand-text">{product.brand}</p>
              )}

              <h1 className="product-title">{product.title}</h1>

              {/* Rating */}
              <div className="rating-row">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={
                        i < (product.rating || 0)
                          ? "fa fa-star yellow"
                          : "fa fa-star-o"
                      }
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating?.toFixed(1) || "0.0"} / 5
                </span>
                <span className="review-count">
                  ({product.numReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="price-row">
                <span className="new-price">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="off-tag">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Stock + Sold */}
              <div className="stock-row">
                <span
                  className={`stock-status ${
                    product.countInStock > 0 ? "in-stock" : "out-stock"
                  }`}
                >
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <span className="sold-count">{product.sold} sold</span>
              </div>

              {/* Short Description */}
              {(product.shortDescription || product.description) && (
                <p className="short-desc">
                  {product.shortDescription || product.description}
                </p>
              )}

              {/* Size Options */}
              {product.size?.length > 0 && (
                <div className="option-row">
                  <span className="option-label">Size:</span>
                  <div className="option-list">
                    {product.size.map((s, i) => (
                      <span key={i} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Options */}
              {product.color?.length > 0 && (
                <div className="option-row">
                  <span className="option-label">Color:</span>
                  <div className="option-list">
                    {product.color.map((c, i) => (
                      <span
                        key={i}
                        className="color-dot"
                        title={c}
                        style={{ backgroundColor: c }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="btn-row">
                <button
                  className="btn-main"
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                >
                  🛒 Add to Cart
                </button>

                <button className="btn-outline" onClick={handleWishlist}>
                  ❤️ Add to Wishlist
                </button>
              </div>

              {/* Meta Info */}
              <div className="meta-info">
                <p>
                  <span>Category:</span> {product.category || "N/A"}
                </p>
                <p>
                  <span>Subcategory:</span> {product.subcategory || "N/A"}
                </p>
                <p>
                  <span>Slug:</span> {product.slug || "N/A"}
                </p>
                <p>
                  <span>Active:</span> {product.isActive ? "Yes" : "No"}
                </p>
                <p>
                  <span>Featured:</span> {product.isFeatured ? "Yes" : "No"}
                </p>
              </div>

              {/* Back link */}
              <div className="back-link">
                <Link to="/products">← Back to Products</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐⭐ ProductTabs (Details | Info | Reviews) ⭐⭐ */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">
            <ProductTabs
              productId={productId}
              description={product.description}
              size={product.size}
              color={product.color}
            />
          </div>
        </div>
      </div>

      {/* ⭐⭐ Related Products ⭐⭐ */}
      <RelatedProductsSection productId={productId} />
    </>
  );
};

export default ProductDetail;
