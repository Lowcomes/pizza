import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzaSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizzaSlice },
});
