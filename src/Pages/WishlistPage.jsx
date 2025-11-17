import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../slices/wishlistSlice";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2>My Wishlist</h2>

      {wishlist.length === 0 && <p>Your wishlist is empty.</p>}

      <div className="row mt-3">
        {wishlist.map((item) => (
          <div className="col-lg-3 col-md-4 col-6 mb-4" key={item._id}>
            <div className="card p-2 shadow-sm">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="img-fluid"
              />

              <h4 className="mt-2">{item.title}</h4>
              <p>₹{item.price}</p>

              <div className="d-flex justify-content-between">
                <Link
                  to={`/product/${item._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(removeFromWishlist(item._id))}
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
