import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    paymentInfo: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
