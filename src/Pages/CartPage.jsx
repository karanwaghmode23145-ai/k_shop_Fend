import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  increaseQtyBackend,
  decreaseQtyBackend,
  removeCartItemBackend,
  clearCartBackend
} from "../slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const safeDispatch = async (thunk) => {
    try {
      const result = await dispatch(thunk).unwrap();
      console.log("✅ Result:", result);
    } catch (err) {
      console.error("❌ API error:", err);
      // user feedback (optional)
      alert(err?.message || JSON.stringify(err));
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading Cart...</h2>;

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
              src={item.productId.thumbnail || item.productId.images[0]}
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

      {items.length > 0 && (
        <div className="text-end mt-4">
          <button
            className="btn btn-danger"
            onClick={() => safeDispatch(clearCartBackend())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
