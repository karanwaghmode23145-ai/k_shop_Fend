import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RelatedProducts.css";


const RelatedProductsSection = ({ productId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `https://k-shop-bend.vercel.app/api/products/related/${productId}`
        );
        setRelated(res.data);
      } catch (err) {
        console.log("❌ Related Error:", err);
      }
    };
    fetchRelated();
  }, [productId]);

  if (!related.length) return null;

  return (
    <div className="container mt-5 related-section">
      <h2 className="related-title">Related Products</h2>

      <div className="row">
        {related.slice(0, 4).map((p) => (
          <div className="col-lg-3 col-md-4 col-6" key={p._id}>
            <Link to={`/product/${p._id}`} className="rp-card">
              <img src={p.thumbnail || p.images[0]} alt={p.title} />
              <h4>{p.title}</h4>
              <p className="price">₹{p.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSection;
