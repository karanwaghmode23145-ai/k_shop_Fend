import React, { useState } from "react";
import axios from "axios";
import "./Review.css";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5003/api/reviews", {
        productId,
        name,
        rating,
        comment,
      });

      alert("Review submitted!");

      setName("");
      setComment("");
      setRating(5);

      onReviewAdded(); // refresh list
    } catch (err) {
      console.log("❌ Error Adding Review:", err);
    }
  };

  return (
    <form className="review-form" onSubmit={submitHandler}>
      <h3>Add a Review</h3>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />

      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value={5}>⭐ 5</option>
        <option value={4}>⭐ 4</option>
        <option value={3}>⭐ 3</option>
        <option value={2}>⭐ 2</option>
        <option value={1}>⭐ 1</option>
      </select>

      <textarea
        placeholder="Write your review..."
        value={comment}
        required
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
