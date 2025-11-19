import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../slices/orderSlice";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="card p-3 mt-3">
          <h5>Order #{order._id}</h5>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Status: {order.orderStatus}</p>

          <Link to={`/order/${order._id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
