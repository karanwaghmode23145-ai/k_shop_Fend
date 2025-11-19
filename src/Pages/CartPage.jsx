import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  increaseQtyBackend,
  decreaseQtyBackend,
  removeCartItemBackend,
  clearCartBackend
} from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Safe dispatch for error handling
  const safeDispatch = async (thunk) => {
    try {
      const result = await dispatch(thunk).unwrap();
      console.log("Result:", result);
    } catch (err) {
      console.error("API error:", err);
      alert(err?.message || JSON.stringify(err));
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading Cart...</h2>;

  // 👉 Total Price Calculation
  const totalPrice = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {items.length === 0 && <h4>No items in cart.</h4>}

      {items.map((item) => (
        <div
          key={item.productId._id}
          className="cart-item border rounded p-3 mb-3"
        >
          <div className="d-flex gap-4 align-items-center">
            <img
              src={
                item.productId.thumbnail ||
                item.productId.images?.[0] ||
                "/placeholder.png"
              }
              width="90"
              className="rounded"
            />

            <div className="flex-grow-1">
              <h5 className="fw-bold">{item.productId.title}</h5>
              <p className="text-muted">₹ {item.productId.price}</p>

              <div className="d-flex align-items-center gap-2 mt-3">

                {/* Decrease */}
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    safeDispatch(
                      decreaseQtyBackend({ productId: item.productId._id })
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                {/* Qty */}
                <span className="px-3 py-1 border rounded">
                  {item.quantity}
                </span>

                {/* Increase */}
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    safeDispatch(
                      increaseQtyBackend({ productId: item.productId._id })
                    )
                  }
                >
                  +
                </button>

                {/* Remove */}
                <button
                  className="btn btn-danger ms-4"
                  onClick={() =>
                    safeDispatch(
                      removeCartItemBackend({ productId: item.productId._id })
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 🚀 Clear Cart + Total + Checkout Button */}
      {items.length > 0 && (
        <div className="text-end mt-4">

          {/* Clear Cart */}
          <button
            className="btn btn-danger me-3"
            onClick={() => safeDispatch(clearCartBackend())}
          >
            Clear Cart
          </button>

          {/* Total Price */}
          <h4 className="mt-3">Total: ₹{totalPrice}</h4>

          {/* Proceed to Checkout */}
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/place-order")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
