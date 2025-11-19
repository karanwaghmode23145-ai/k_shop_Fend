import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://k-shop-bend.vercel.app/api/reviews/${productId}`);
        setReviews(res.data);
      } catch (err) {
        console.log("❌ Review Fetch Error:", err);
      }
    };

    fetchReviews();
  }, [productId]);

  const getInitials = (name) => {
    return name.slice(0, 1).toUpperCase();
  };

  return (
    <div className="review-list">
      <h3>Customer Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((r) => (
        <div className="review-item" key={r._id}>
          
          {/* Avatar */}
          <div className="review-avatar">{getInitials(r.name)}</div>

          {/* Content */}
          <div className="review-content">
            <h4>{r.name}</h4>
            <div className="review-date">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>

            <div className="review-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star ${i < r.rating ? "filled" : ""}`}
                ></i>
              ))}
            </div>

            <p className="review-text">{r.comment}</p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ReviewList;
