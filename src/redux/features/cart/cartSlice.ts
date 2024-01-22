import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}
const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    incQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload
      );
      if (existingProduct) {
        existingProduct.quantity! += 1;
        state.total += existingProduct.price;
      }
    },
    decQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload
      );
      if (existingProduct && existingProduct.quantity! > 1) {
        existingProduct.quantity! -= 1;
        state.total -= existingProduct.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload
      );

      if (existingProduct && existingProduct.quantity! >= 1) {
        state.total -= existingProduct.price * existingProduct.quantity!;
      }

      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addToCart, incQuantity, decQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
