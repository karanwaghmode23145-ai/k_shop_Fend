import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

/* ===================== CREATE ORDER ===================== */
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
      return data.order;

    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== USER ORDERS ===================== */
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
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== SINGLE ORDER ===================== */
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
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ===================== REDUCER ===================== */
const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: null,
    orders: [],
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order = action.payload;
      })
  },
});

export default orderSlice.reducer;
