import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  item: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.item.push(action.payload);
    //   state.totalPrice = action.payload.price + state.totalPrice;
    // },
    addItem(state, action) {
      const findeItem = state.item.find((obj) => obj.id === action.payload.id);
      if (findeItem) {
        findeItem.count++;
      } else {
        state.item.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.item.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    minusItem(state, action) {
      const findeItem = state.item.find((obj) => obj.id === action.payload);
      if (findeItem) {
        findeItem.count--;
      }
    },
    removeItem(state, action) {
      state.item = state.item.filter((obj) => obj.id !== action.payload);
    },
    clearItem(state, action) {
      state.item = [];
    },
  },
});
export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
