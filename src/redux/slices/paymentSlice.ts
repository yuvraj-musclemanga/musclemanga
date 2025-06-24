import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const paymentSlice = createSlice({
  name: "paymentInfo",
  initialState: {
    paymentAmount: 0,
  },
  reducers: {
    setPaymentAmount: (state, action) => {
      state.paymentAmount = action.payload;
    },
  },
});

export const { setPaymentAmount } = paymentSlice.actions;

export const selectPaymentAmount = (state: RootState) =>
  state.paymentInfo.paymentAmount;

export default paymentSlice.reducer;
