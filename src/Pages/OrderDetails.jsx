import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../slices/orderSlice";
import { useParams, Link } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading || !order) {
    return (
      <div className="order-loader-wrapper">
        <div className="order-spinner"></div>
      </div>
    );
  }

  return (
    <div className="order-page container">

      {/* SECTION TITLE */}
      <h2 className="order-title">📦 Order Details</h2>

      {/* ORDER INFO */}
      <div className="row mt-4">

        {/* LEFT CARD — SHIPPING INFO */}
        <div className="col-lg-6">
          <div className="order-card">
            <h4>Shipping Information</h4>
            <p><strong>Name:</strong> {order.shippingInfo.fullName}</p>
            <p><strong>Phone:</strong> {order.shippingInfo.phone}</p>
            <p><strong>Address:</strong> {order.shippingInfo.address}</p>
            <p>
              {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
              {order.shippingInfo.pincode}
            </p>
          </div>
        </div>

        {/* RIGHT CARD — ORDER STATUS */}
        <div className="col-lg-6">
          <div className="order-card">
            <h4>Order Status</h4>
            <p><strong>Status:</strong> <span className="status">{order.orderStatus}</span></p>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Placed On:</strong> {order.createdAt?.slice(0, 10)}</p>
          </div>
        </div>

      </div>

      {/* ITEMS LIST */}
      <div className="order-card mt-4">
        <h4>Items Ordered</h4>

        {order.orderItems.map((item) => (
          <div key={item.productId} className="order-item-row">
            <div className="d-flex align-items-center gap-3">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="order-item-img"
              />

              <div>
                <h5>{item.title}</h5>
                <p>₹{item.price} × {item.qty}</p>
              </div>
            </div>

            <span className="item-total">₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="order-card mt-4 summary-card">
        <h4>Price Summary</h4>

        <div className="summary-line">
          <span>Subtotal:</span>
          <strong>₹{order.itemsPrice}</strong>
        </div>

        <div className="summary-line">
          <span>Shipping:</span>
          <strong>₹{order.shippingPrice}</strong>
        </div>

        <div className="summary-line">
          <span>Tax:</span>
          <strong>₹{order.taxPrice}</strong>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total:</span>
          <strong>₹{order.totalPrice}</strong>
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="text-center mt-4">
        <Link to="/my-orders" className="back-btn">← Back to Orders</Link>
      </div>

    </div>
  );
};

export default OrderDetails;
