import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
}
const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    incQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload
      );
      if (existingProduct) {
        existingProduct.quantity! += 1;
      }
    },
    decQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload
      );
      if (existingProduct && existingProduct.quantity! > 1) {
        existingProduct.quantity! -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
});

export const { addToCart, incQuantity, decQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
