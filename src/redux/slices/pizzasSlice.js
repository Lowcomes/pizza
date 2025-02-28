import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk('users/fetchPizzaStatus', async (params) => {
  const { numberPage, categoryIndex, activeSort, activeSortSize } = params;
  const res = await axios.get(
    `https://644bf1c54bdbc0cc3a9e9e16.mockapi.io/pizzaItem?page=${numberPage}&limit=4&${
      categoryIndex > 0 ? `category=${categoryIndex}` : ''
    }&sortBy=${activeSort.sortProperty}&order=${activeSortSize ? 'asc' : 'desc'}`,
  );
  return res.data;
});

const initialState = {
  itemPizza: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzaItem(state, action) {
      state.itemPizza = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      // state.entities.push(action.payload);
      console.log(state);
    });
  },
});
export const { setPizzaItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
