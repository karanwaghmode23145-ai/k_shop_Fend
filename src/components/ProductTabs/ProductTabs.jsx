import React, { useState } from "react";
import ReviewSection from "../Reviews/ReviewSection";
import "./ProductTabs.css";

const ProductTabs = ({ productId, description, size, color }) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="product-tabs">

      {/* ==== TAB HEADERS ==== */}
      <div className="tabs-nav">
        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>

        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          Info
        </button>

        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* ==== TAB CONTENT ==== */}
      <div className="tabs-content">

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <div className="tab-panel fadeIn">
            <h4>Product Details</h4>
            <p>{description}</p>
          </div>
        )}

        {/* INFO TAB */}
        {activeTab === "info" && (
          <div className="tab-panel fadeIn">
            <h4>Additional Information</h4>

            <ul className="info-list">
              <li><strong>Available Sizes:</strong> {size.join(", ")}</li>
              <li><strong>Available Colors:</strong> {color.join(", ")}</li>
            </ul>

          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="tab-panel fadeIn">
            <ReviewSection productId={productId} />
          </div>
        )}

      </div>

    </div>
  );
};

export default ProductTabs;
