import { configureStore } from '@reduxjs/toolkit';
import NavbarReducer from './NavbarReducer';
import UserReducer from './UserReducer';

export default configureStore({
  reducer: {
    user: UserReducer,
    navbar: NavbarReducer
  },
});
