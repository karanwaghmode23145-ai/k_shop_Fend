import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlistBackend,
  removeFromWishlistBackend,
} from "../slices/wishlistSlice";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const dispatch = useDispatch();

  // 🟢 Correct selector
  const items = useSelector((state) => state.wishlist.items);

  // 🔄 Load wishlist when page opens
  useEffect(() => {
    dispatch(fetchWishlistBackend());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>❤️ My Wishlist</h2>

      {items.length === 0 && <p>Your wishlist is empty.</p>}

      <div className="row mt-3">
        {items.map((w) => (
          <div className="col-lg-3 col-md-4 col-6 mb-4" key={w.productId._id}>
            <div className="card p-2 shadow-sm">

              {/* Thumbnail */}
              <img
                src={w.productId.thumbnail || w.productId.images[0]}
                alt={w.productId.title}
                className="img-fluid"
              />

              <h5 className="mt-2">{w.productId.title}</h5>
              <p className="fw-bold">₹{w.productId.price}</p>

              <div className="d-flex justify-content-between">
                
                <Link
                  to={`/product/${w.productId._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    dispatch(removeFromWishlistBackend(w.productId._id))
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
