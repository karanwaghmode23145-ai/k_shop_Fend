import React from "react";
import { useDispatch } from "react-redux";
import { 
  addToCart, 
  removeFromCart, 
  increaseQty, 
  decreaseQty, 
  clearCart 
} from "../slices/cartSlice";

const CartTester = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Cart Tester</h2>

      <button
        onClick={() =>
          dispatch(addToCart({ _id: "44", title: "Bag", price: 699 }))
        }
      >
        ➕ Add Bag
      </button>

      <button onClick={() => dispatch(removeFromCart("44"))}>
        🗑️ Remove Bag
      </button>

      <button onClick={() => dispatch(increaseQty("44"))}>
        🔼 Increase Qty (Bag)
      </button>

      <button onClick={() => dispatch(decreaseQty("44"))}>
        🔽 Decrease Qty (Bag)
      </button>

      <button onClick={() => dispatch(clearCart())}>
        ❌ Clear Cart
      </button>
    </div>
  );
};

export default CartTester;
