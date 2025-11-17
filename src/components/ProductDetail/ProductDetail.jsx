import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTabs from "../ProductTabs/ProductTabs";


import "./ProductDetail.css";
import RelatedProductsSection from "../RelatedProducts/RelatedProductsSection";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { addToWishlist } from "../../slices/wishlistSlice";

const ProductDetail = () => {
  const productId = window.location.pathname.split("/").pop();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");  // <<< PROTECTED CHECK

const handleAddToCart = () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const payload = {
      _id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images[0],
    };

    dispatch(addToCart(payload));
    console.log("Cart Added:", payload);
  };

  // ⭐ PROTECTED ADD TO WISHLIST
  const handleWishlist = () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const item = {
      _id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images[0],
    };

    dispatch(addToWishlist(item));
    console.log("Wishlist Added:", item);
  };

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://k-shop-bend.vercel.app/api/products/${productId}`
        );
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
    <>
      <div className="product-detail container">

        {/* ================= ROW 1 ================= */}
        <div className="row">

          {/* LEFT COL - IMAGES */}
          <div className="col-lg-6 col-md-12">
            <div className="image-section">

              <div className="main-image">
                <img src={activeImage} alt={product.title} />
              </div>

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
          </div>

          {/* RIGHT COL - PRODUCT INFO */}
          <div className="col-lg-6 col-md-12">
            <div className="info-section">

              <h2 className="title">{product.title}</h2>

              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`fa fa-star ${
                      i < product.rating ? "active" : ""
                    }`}
                  ></i>
                ))}
                <span className="reviews">{product.numReviews} Reviews</span>
              </div>

              <div className="price-box">
                <span className="price">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="discount">-{product.discountPercent}%</span>
                )}
              </div>

              <p className="stock">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              {product.size.length > 0 && (
                <div className="size-box">
                  <h4>Select Size:</h4>
                  <div className="size-list">
                    {product.size.map((s, i) => (
                      <span key={i} className="size-item">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.color.length > 0 && (
                <div className="color-box">
                  <h4>Select Color:</h4>
                  <div className="color-list">
                    {product.color.map((c, i) => (
                      <span key={i} className="color-item">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="buttons">
                <button className="add-cart" onClick={handleAddToCart}>Add to Cart</button>
               <button className="wishlist" onClick={handleWishlist}>❤️ Wishlist</button>
              </div>

              <div className="meta">
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
              </div>

            </div>
          </div>

        </div>
       

      </div>

       {/* ================= END ROW 1 ================= */}

        {/* ================= ROW 2 — FULL WIDTH TABS ================= */}
        <div className="container">
               <div className="row mt-5">
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
       
        {/* ================= END ROW 2 ================= */}

        <RelatedProductsSection productId={productId} />
    </>
  );
};

export default ProductDetail;
