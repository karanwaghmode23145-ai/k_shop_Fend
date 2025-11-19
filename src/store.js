import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import orderReducer from "./slices/orderSlice";


const store = configureStore({
  reducer: {
    order: orderReducer,
    cart: cartReducer,
    wishlist: wishlistReducer, 
  },
});

export default store;
