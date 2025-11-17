import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const RelatedProductsPage = () => {
  const { productId } = useParams();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5003/api/products/related/${productId}`
        );
        setRelated(res.data);
      } catch (err) {
        console.log("❌ Page Related Error:", err);
      }
    };
    fetchRelated();
  }, [productId]);

  return (
    <div className="container related-page">
      <h2 className="page-title">Related Products</h2>

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

export default RelatedProductsPage;
