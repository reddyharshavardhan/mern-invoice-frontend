import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import invoiceReducer from "./invoiceSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    invoice: invoiceReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;