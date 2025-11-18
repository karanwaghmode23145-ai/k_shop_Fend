import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import {
  addToCartBackend
} from "../../slices/cartSlice";

import {
  addToWishlistBackend
} from "../../slices/wishlistSlice";

import ProductTabs from "../ProductTabs/ProductTabs";
import RelatedProductsSection from "../RelatedProducts/RelatedProductsSection";

import "./ProductDetail.css";

const ProductDetail = () => {
  const productId = window.location.pathname.split("/").pop();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ⭐ ADD TO CART */
  const handleAddToCart = () => {
    if (!token) return (window.location.href = "/login");

    dispatch(addToCartBackend({ productId: product._id, qty: 1 }));
    console.log("🛒 Added to Cart:", product.title);
  };

  /* ⭐ ADD TO WISHLIST */
  const handleWishlist = () => {
    if (!token) return (window.location.href = "/login");

    dispatch(addToWishlistBackend({ productId: product._id }));
    console.log("💛 Added to Wishlist:", product.title);
  };

  /* ⭐ Load Product */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5003/api/products/${productId}`
        );
        setProduct(res.data);
        setActiveImage(res.data.thumbnail || res.data.images[0]);
      } catch (err) {
        console.log("❌ Product Load Error:", err);
      }
      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product Not Found</p>;

  return (
    <>
      <div className="product-detail container">
        <div className="row">

          {/* =============== LEFT IMAGES =============== */}
          <div className="col-lg-6 col-md-12">

            <img src={activeImage} className="main-image" alt="product" />

            <div className="thumb-list">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={activeImage === img ? "active" : ""}
                  onClick={() => setActiveImage(img)}
                  alt="thumb"
                />
              ))}
            </div>

          </div>

          {/* =============== RIGHT INFO =============== */}
          <div className="col-lg-6 col-md-12">
            <h2>{product.title}</h2>
            <h3>₹{product.price}</h3>

            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="wishlist" onClick={handleWishlist}>
              ❤️ Wishlist
            </button>
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
