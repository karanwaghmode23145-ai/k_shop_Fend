import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("➡️ action: addToCart", action.payload);
            const item = action.payload;
            const exist = state.cartItems.find((x) => x._id === item._id);

            if (exist) {
                console.log("🔁 Item exists — increasing qty by 1");
                exist.qty += 1;
            } else {
                console.log("➕ Item not in cart — pushing with qty 1");
                state.cartItems.push({ ...item, qty: 1 });
            }
            console.log("🔎 New cart state:", JSON.parse(JSON.stringify(state.cartItems)));
        },

        removeFromCart: (state, action) => {
            console.log("➡️ reducer:removeFromCart payload:", action.payload);
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            console.log("🔎 New cart state:", JSON.parse(JSON.stringify(state.cartItems)));
        },


        increaseQty: (state, action) => {
            console.log("➡️ reducer:increaseQty payload:", action.payload);
            const item = state.cartItems.find((x) => x._id === action.payload);
            if (item) {
                item.qty++;
                console.log("🔼 qty increased:", item._id, "->", item.qty);
            } else {
                console.log("⚠️ increaseQty: item not found", action.payload);
            }
            console.log("🔎 New cart state:", JSON.parse(JSON.stringify(state.cartItems)));
        },

        decreaseQty: (state, action) => {
            console.log("➡️ reducer:decreaseQty payload:", action.payload);
            const item = state.cartItems.find((x) => x._id === action.payload);
            if (item && item.qty > 1) {
                item.qty--;
                console.log("🔽 qty decreased:", item._id, "->", item.qty);
            } else if (item) {
                console.log("⚠️ decreaseQty: qty is 1 — not decreasing further");
            } else {
                console.log("⚠️ decreaseQty: item not found", action.payload);
            }
            console.log("🔎 New cart state:", JSON.parse(JSON.stringify(state.cartItems)));
        },

        clearCart: (state) => {
      console.log("➡️ reducer:clearCart");
      state.cartItems = [];
      console.log("🔎 New cart state: []");
    },



    }
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
