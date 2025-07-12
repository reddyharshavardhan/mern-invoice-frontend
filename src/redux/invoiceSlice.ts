
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";type Product = { name: string; qty: number; rate: number };
type InvoiceState = { products: Product[] };
const initialState: InvoiceState = { products: [] };
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products.splice(action.payload, 1);
    },
    clearProducts(state) {
      state.products = [];
    }
  }
});
export const { addProduct, removeProduct, clearProducts } = invoiceSlice.actions;
export default invoiceSlice.reducer;