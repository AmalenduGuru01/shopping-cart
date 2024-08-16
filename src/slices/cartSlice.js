import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  discount: 0, // Fixed discount amount
  couponDiscount: 0, // Discount from applying a coupon
};

const validCoupons = {
  SAVE10: 10,
  DISCOUNT15: 15,
  OFF20: 20,
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
    applyCouponDiscount: (state, action) => {
      const couponCode = action.payload;
      const discount = validCoupons[couponCode];
      console.log("YEH TOH DEKH YAAAR: ",discount)
      if (discount) {
        state.couponDiscount = discount;
      } else {
        state.couponDiscount = 0;
      }
    },
    clearDiscounts: (state) => {
      state.discount = 0;
      state.couponDiscount = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.couponDiscount = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, applyFixedDiscount, applyCouponDiscount, clearDiscounts,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
