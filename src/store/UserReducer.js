import { createSlice } from "@reduxjs/toolkit";

const { atob, btoa } = window;
const local = atob(localStorage.getItem('digilib') || '') || undefined;
const initialState = local
  ? JSON.parse(local)
  : {
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
        is_admin: action.payload.is_admin,
      };

      state = Object.assign(state, payload);
      localStorage.setItem('digilib', btoa(JSON.stringify(state)));
    },
  },
});

export const { setUser } = User.actions;

export default User.reducer;
