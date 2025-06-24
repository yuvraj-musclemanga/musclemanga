import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {},
    cartTotal: 0,
    address: {},
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setCartItems, setCartTotal, setAddress } = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.cartItems;
export const selectTotal = (state: RootState) => state.cart.cartTotal;
export const selectAddress = (state: RootState) => state.cart.address;

export default cartSlice.reducer;
