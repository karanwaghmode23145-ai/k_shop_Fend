import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

/* =========================================================
 🛒 CREATE ORDER
========================================================= */
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosClient.post("/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend returns the order directly, not {order: ...}
      return data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

/* =========================================================
 📦 GET USER ORDERS
========================================================= */
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosClient.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* =========================================================
 🔍 GET ORDER BY ID
========================================================= */
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosClient.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Order not found"
      );
    }
  }
);

/* =========================================================
 🧾 SLICE CONFIG
========================================================= */
const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: null,
    orders: [],
    error: null,
  },

  reducers: {
    clearOrderState: (state) => {
      state.order = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      /* 🔥 CREATE ORDER */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // order object itself
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 📌 GET USER ORDERS */
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 🔍 GET ORDER BY ID */
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
