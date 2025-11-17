import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  // 🔥 EXACT CORRECT SELECTOR
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>Cart is empty.</p>}

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            margin: "12px 0",
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: 80, height: 80, objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
          </div>

          <div>
            <button onClick={() => dispatch(decreaseQty(item._id))}>-</button>
            <span style={{ margin: "0 8px" }}>{item.qty}</span>
            <button onClick={() => dispatch(increaseQty(item._id))}>+</button>
          </div>

          <button
            style={{ marginLeft: 12, color: "red" }}
            onClick={() => dispatch(removeFromCart(item._id))}
          >
            Remove
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
