import React, { useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import "./Review.css";

const ReviewSection = ({ productId }) => {
  const [refresh, setRefresh] = useState(false);

  const refreshReviews = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="review-section container">

      <div className="row">

        {/* LEFT SIDE = CUSTOMER REVIEWS */}
        <div className="col-lg-6 col-md-12">
          <div className="review-box">
            <ReviewList productId={productId} key={refresh} />
          </div>
        </div>

        {/* RIGHT SIDE = ADD REVIEW */}
        <div className="col-lg-6 col-md-12">
          <div className="review-box">
            <ReviewForm productId={productId} onReviewAdded={refreshReviews} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default ReviewSection;
