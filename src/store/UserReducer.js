import { createSlice } from "@reduxjs/toolkit";

const initialState =
  JSON.parse(localStorage.getItem('digilib'))
  ||
  {
    nama: '',
    email: '',
    tanggal_lahir: ''
  };

export const User = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = {
        nama: action.payload.nama,
        email: action.payload.email,
        tanggal_lahir: action.payload.tanggal_lahir,
      };

      state = Object.assign(state, payload);
      localStorage.setItem('digilib', JSON.stringify(state));
    },
  },
});

export const { setUser } = User.actions;

export default User.reducer;
