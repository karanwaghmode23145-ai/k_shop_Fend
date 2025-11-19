import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const itemsPrice = items.reduce((a, c) => a + c.productId.price * c.quantity, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = itemsPrice * 0.18;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = async () => {
    const orderData = {
      orderItems: items.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        thumbnail: item.productId.thumbnail,
        qty: item.quantity,
        price: item.productId.price,
      })),
      shippingInfo: shipping,
      paymentMethod: "COD",
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    const result = await dispatch(createOrder(orderData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate(`/order/${result.payload._id}`);
    }
  };

  return (
    <div className="container">
      <h2>Place Order</h2>

      <div className="row mt-3">
        <div className="col-md-7">
          <h4>Shipping Information</h4>
          {Object.keys(shipping).map((key) => (
            <input
              key={key}
              className="form-control mt-2"
              placeholder={key}
              value={shipping[key]}
              onChange={(e) =>
                setShipping({ ...shipping, [key]: e.target.value })
              }
            />
          ))}
        </div>

        <div className="col-md-5">
          <h4>Order Summary</h4>

          {items.map((item) => (
            <div key={item.productId._id} className="d-flex justify-content-between">
              <span>{item.productId.title}</span>
              <span>₹{item.productId.price} x {item.quantity}</span>
            </div>
          ))}

          <hr />
          <h4>Total: ₹{totalPrice.toFixed(2)}</h4>

          <button className="btn btn-primary w-100 mt-3" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
