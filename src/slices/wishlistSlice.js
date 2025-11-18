import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5003/api/wishlist";

/* ================================
   ⭐ FETCH WISHLIST — Backend
================================ */
export const fetchWishlistBackend = createAsyncThunk(
  "wishlist/fetchWishlistBackend",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.items; // backend returns items array
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ================================
   ⭐ ADD TO WISHLIST — Backend
================================ */
export const addToWishlistBackend = createAsyncThunk(
  "wishlist/addToWishlistBackend",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        API,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.items;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ================================
   ⭐ REMOVE FROM WISHLIST — Backend
================================ */
export const removeFromWishlistBackend = createAsyncThunk(
  "wishlist/removeFromWishlistBackend",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${API}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.items;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchWishlistBackend.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // ADD
      .addCase(addToWishlistBackend.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // REMOVE
      .addCase(removeFromWishlistBackend.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
