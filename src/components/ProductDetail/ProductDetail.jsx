import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTabs from "../ProductTabs/ProductTabs";
import "./ProductDetail.css";
import RelatedProductsSection from "../RelatedProducts/RelatedProductsSection";
import { useDispatch } from "react-redux";
import { addToCartBackend } from "../../slices/cartSlice";
import { addToWishlist } from "../../slices/wishlistSlice";

const ProductDetail = () => {
  const productId = window.location.pathname.split("/").pop();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ⭐ Add to Cart Backend
  const handleAddToCart = () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    dispatch(addToCartBackend({ productId: product._id, qty: 1 }));
    console.log("🛒 Product Added:", product.title);
  };

  // ⭐ Wishlist (local)
  const handleWishlist = () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    dispatch(
      addToWishlist({
        _id: product._id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images[0],
      })
    );
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5003/api/products/${productId}`
        );
        setProduct(res.data);
        setActiveImage(res.data.thumbnail || res.data.images[0]);
      } catch (err) {
        console.log("❌ Product Fetch Error:", err);
      }
      setLoading(false);
    };

    load();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Not Found</p>;

  return (
    <>
      <div className="product-detail container">
        <div className="row">
          {/* LEFT */}
          <div className="col-lg-6 col-md-12">
            <img src={activeImage} className="main-image" />

            <div className="thumb-list">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={activeImage === img ? "active" : ""}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
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

      <RelatedProductsSection productId={productId} />
    </>
  );
};

export default ProductDetail;
