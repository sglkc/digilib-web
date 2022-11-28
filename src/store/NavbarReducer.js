import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const Navbar = createSlice({
  name: 'Navbar',
  initialState,
  reducers: {
    toggleNavbar: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { toggleNavbar } = Navbar.actions;

export default Navbar.reducer;
