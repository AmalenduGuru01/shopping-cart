import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  discount: 0, // Fixed discount amount
  extraDiscount: 0, // Additional discount based on payment method
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    applyFixedDiscount: (state, action) => {
      state.discount = action.payload;
    },
    applyExtraDiscount: (state, action) => {
      state.extraDiscount = action.payload;
    },
    clearDiscounts: (state) => {
      state.discount = 0;
      state.extraDiscount = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, applyFixedDiscount, applyExtraDiscount, clearDiscounts } = cartSlice.actions;
export default cartSlice.reducer;
