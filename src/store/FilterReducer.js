import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: 'Terbaru',
  type: undefined
};

export const Filter = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    setOrder: (state, action) => Object.assign(state, { order: action.payload }),
    setType: (state, action) => Object.assign(state, { type: action.payload })
  },
});

export const { setOrder, setType } = Filter.actions;

export default Filter.reducer;
