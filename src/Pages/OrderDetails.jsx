import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../slices/orderSlice";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading || !order) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>Order #{order._id}</h2>

      <h4 className="mt-3">Shipping</h4>
      <p>{order.shippingInfo.fullName}</p>
      <p>{order.shippingInfo.address}, {order.shippingInfo.city}</p>
      <p>{order.shippingInfo.state} - {order.shippingInfo.pincode}</p>

      <h4 className="mt-3">Items</h4>
      {order.orderItems.map((item) => (
        <div key={item._id} className="d-flex justify-content-between">
          <span>{item.title}</span>
          <span>₹{item.price} × {item.qty}</span>
        </div>
      ))}

      <hr />
      <h4>Total: ₹{order.totalPrice}</h4>
      <h5>Status: {order.orderStatus}</h5>
    </div>
  );
};

export default OrderDetails;
