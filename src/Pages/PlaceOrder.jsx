import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/orderSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.cart);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  /* ========== PRICE CALCULATION ========== */
  const itemsPrice = items.reduce((sum, item) => {
    const price = Number(item?.productId?.price || item?.price || 0);
    const qty = Number(item?.quantity || 1);
    return sum + price * qty;
  }, 0);

  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = itemsPrice * 0.18;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const [processing, setProcessing] = useState(false);

  /* ========== PLACE ORDER FUNCTION ========== */
  const handlePlaceOrder = async () => {
    if (!shipping.fullName || !shipping.address || !shipping.phone) {
      return toast.error("⚠ Please fill all required details");
    }

    if (items.length === 0) {
      return toast.error("🛒 Your cart is empty");
    }

    const orderData = {
      orderItems: items.map((item) => ({
        productId: item.productId._id,             // ✅ Must
        qty: item.quantity,                        // ✅ IMPORTANT
        price: Number(item.productId.price),       // backend recalc karega but ok
        title: item.productId.title,
        thumbnail: item.productId.thumbnail,
      })),

      shippingInfo: shipping,
      paymentMethod: "COD",
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    console.log("📦 FINAL ORDER SENT:", orderData);

    toast.info("📦 Placing your order...");
    setProcessing(true);

    const result = await dispatch(createOrder(orderData));
    setProcessing(false);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("🎉 Order placed successfully!");
      navigate(`/order/${result.payload._id}`);
    } else {
      toast.error("❌ Order failed. Try again.");
    }
  };

  /* ========== LOADING SPINNER ========== */
  if (loading) {
    return (
      <div className="po-loader-wrapper">
        <div className="po-spinner"></div>
      </div>
    );
  }

  return (
    <div className="place-order container">
      <h2 className="title">📦 Confirm Your Order</h2>

      <div className="row mt-4">
        {/* 🟣 LEFT: SHIPPING INFO */}
        <div className="col-lg-7">
          <div className="card-box">
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
        </div>

        {/* 🔵 RIGHT: ORDER SUMMARY */}
        <div className="col-lg-5">
          <div className="card-box">
            <h4>Order Summary</h4>

            {items.map((item) => (
              <div key={item.productId._id} className="summary-item">
                <span>{item.productId.title}</span>
                <span>
                  ₹{item.productId.price} × {item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <div className="summary-total">
              <p>Subtotal: <strong>₹{itemsPrice.toFixed(2)}</strong></p>
              <p>Shipping: <strong>₹{shippingPrice}</strong></p>
              <p>Tax (18%): <strong>₹{taxPrice.toFixed(2)}</strong></p>
              <h3>Total: <span>₹{totalPrice.toFixed(2)}</span></h3>
            </div>

            <button
              className="place-btn"
              onClick={handlePlaceOrder}
              disabled={processing}
            >
              {processing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      <div className="back-link">
        <Link to="/cart">← Back to Cart</Link>
      </div>
    </div>
  );
};

export default PlaceOrder;
