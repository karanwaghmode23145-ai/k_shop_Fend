import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  increaseQtyBackend,
  decreaseQtyBackend,
  removeCartItemBackend,
  clearCartBackend
} from "../slices/cartSlice";

import { useNavigate, Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Safe Dispatch Wrapper
  const safeDispatch = async (thunk) => {
    try {
      await dispatch(thunk).unwrap();
    } catch (err) {
      alert(err?.message || "Something went wrong");
    }
  };

  /* ⭐ FIXED TOTAL PRICE (SUPPORT BOTH item.price & populated product.price) */
  const totalPrice = items.reduce((sum, item) => {
    const price = Number(
      item?.price ||                          // stored price in DB
      item?.productId?.price ||               // populated price
      0
    );

    const qty = Number(item?.quantity || 1);
    return sum + price * qty;
  }, 0);

  /* ⭐ LOADING SPINNER */
  if (loading) {
    return (
      <div className="cart-loader-wrapper">
        <div className="cart-spinner"></div>
      </div>
    );
  }

  return (
    <div className="cart-page container">

      <h2 className="cart-title">🛒 Your Shopping Cart</h2>

      {/* EMPTY CART */}
      {items.length === 0 && (
        <div className="empty-cart">
          <h3>Your cart is empty 😔</h3>
          <Link to="/collection" className="browse-btn">
            Browse Products
          </Link>
        </div>
      )}

      {/* CART LIST */}
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.productId._id} className="cart-card">

            {/* PRODUCT IMAGE */}
            <img
              src={item.productId.thumbnail || item.productId.images?.[0]}
              alt={item.productId.title}
              className="cart-img"
            />

            {/* PRODUCT INFO */}
            <div className="cart-info">
              <h4>{item.productId.title}</h4>

              {/* Price UI (Shows discount if available) */}
              <p className="price">
                ₹
                {item.productId.price ||
                  item.price}
              </p>

              {/* QUANTITY */}
              <div className="qty-box">

                <button
                  onClick={() =>
                    safeDispatch(
                      decreaseQtyBackend({ productId: item.productId._id })
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    safeDispatch(
                      increaseQtyBackend({ productId: item.productId._id })
                    )
                  }
                >
                  +
                </button>

              </div>
            </div>

            {/* REMOVE ITEM BUTTON */}
            <button
              className="remove-btn"
              onClick={() =>
                safeDispatch(
                  removeCartItemBackend({ productId: item.productId._id })
                )
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY SECTION */}
      {items.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{totalPrice}</h3>

          <div className="summary-btns">

            <button
              className="clear-btn"
              onClick={() => safeDispatch(clearCartBackend())}
            >
              Clear Cart
            </button>

            <button
              className="checkout-btn"
              onClick={() => navigate("/place-order")}
            >
              Proceed to Checkout →
            </button>

          </div>
        </div>
      )}

      {/* BACK LINK */}
      <div className="back-link">
        <Link to="/collection">← Back to Products</Link>
      </div>

    </div>
  );
};

export default CartPage;
