import React from "react";
import { useDispatch } from "react-redux";
import { addToCartBackend } from "../slices/cartSlice";

const CartTester = () => {
  const dispatch = useDispatch();

  const testAdd = () => {
    dispatch(
      addToCartBackend({
        productId: "6919ae0273943c08d8996886",
        qty: 1,
      })
    );
  };

  return (
    <div className="container mt-5">
      <h2>Cart Tester</h2>
      <button className="btn btn-primary" onClick={testAdd}>
        Add Sample Product
      </button>
    </div>
  );
};

export default CartTester;
