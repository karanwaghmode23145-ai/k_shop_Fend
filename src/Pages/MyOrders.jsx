import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../slices/orderSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./MyOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  /* ⭐ Show toast on error */
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  /* ⭐ Loading Spinner */
  if (loading) {
    return (
      <div className="orders-loader">
        <div className="orders-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container my-orders-page">

      <h2 className="orders-title">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">

              <div className="order-top">
                <h5>Order #{order._id}</h5>
                <span className="status">{order.orderStatus}</span>
              </div>

              <p className="order-total">Total Amount: <strong>₹{order.totalPrice}</strong></p>
              <p className="order-date">
                Placed On: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <Link to={`/order/${order._id}`} className="view-btn">
                View Details →
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
