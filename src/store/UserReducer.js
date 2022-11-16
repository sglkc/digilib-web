import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nama: '',
  email: '',
  tanggal_lahir: '',
  token: ''
};

export const User = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { setUser } = User.actions;

export default User.reducer;
