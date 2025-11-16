import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingBasket,
  FaRegEye,
  FaStar,
  FaRegStar
} from "react-icons/fa";

const ProductCard = ({ product, view }) => {
  if (!product) return null; // safety

  const {
    _id,
    title,
    thumbnail,
    images,
    price,
    oldPrice,
    rating
  } = product;

  return (
    <div className={`product-card ${view}`}>

      <Link to={`/product/${_id}`} className="img-box">
        <img
          className="main-img"
          src={thumbnail || images?.[0]}
          alt={title}
        />
        <img
          className="hover-img"
          src={images?.[1] || thumbnail}
          alt={title}
        />

        <div className="product-actions">
          <button><FaRegEye /></button>
          <button><FaHeart /></button>
          <button><FaShoppingBasket /></button>
        </div>
      </Link>

      <div className="content">
        <Link to={`/product/${_id}`}>
          <h4>{title}</h4>
        </Link>

        <div className="rating">
          {[1, 2, 3, 4, 5].map((i) =>
            i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div>

        <div className="price">
          {oldPrice && <span className="old">₹{oldPrice}</span>}
          <span className="new">₹{price}</span>
        </div>

        {view === "list" && (
          <button className="add-cart">
            <FaShoppingBasket /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
