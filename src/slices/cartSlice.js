import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://k-shop-bend.vercel.app/api/cart";

/* ======================================================
   ⭐ GET CART — Load user cart
====================================================== */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ======================================================
   ⭐ ADD TO CART
====================================================== */
export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        API,
        { productId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ======================================================
   ⭐ INCREASE QTY (+1)
====================================================== */
export const increaseQtyBackend = createAsyncThunk(
  "cart/increaseQtyBackend",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API}/increase`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ======================================================
   ⭐ DECREASE QTY ( -1 )
====================================================== */
export const decreaseQtyBackend = createAsyncThunk(
  "cart/decreaseQtyBackend",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API}/decrease`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ======================================================
   ⭐ REMOVE ITEM
====================================================== */
export const removeCartItemBackend = createAsyncThunk(
  "cart/removeCartItemBackend",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${API}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ======================================================
   ⭐ CLEAR CART
====================================================== */
export const clearCartBackend = createAsyncThunk(
  "cart/clearCartBackend",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ======================================================
   ⭐ REDUX SLICE
====================================================== */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* FETCH CART */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.payload;
      })

      /* ADD TO CART */
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      /* INCREASE QTY */
      .addCase(increaseQtyBackend.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      /* DECREASE QTY */
      .addCase(decreaseQtyBackend.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      /* REMOVE ITEM */
      .addCase(removeCartItemBackend.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      /* CLEAR CART */
      .addCase(clearCartBackend.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
