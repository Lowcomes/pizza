import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  activeSortSize: false,
  numberPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setActiveSort(state, action) {
      state.sort = action.payload;
    },
    setActiveSortSize(state, action) {
      state.activeSortSize = action.payload;
    },
    setNumberPage(state, action) {
      state.numberPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryIndex = +action.payload.categoryIndex;
      state.sort = action.payload.sort;
      state.activeSortSize = action.payload.activeSortSize;
      state.numberPage = +action.payload.numberPage;
    },
  },
});
export const { setCategoryIndex, setActiveSort, setActiveSortSize, setNumberPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
