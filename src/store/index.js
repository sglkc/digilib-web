import { configureStore } from '@reduxjs/toolkit';
import FilterReducer from './FilterReducer';
import NavbarReducer from './NavbarReducer';
import UserReducer from './UserReducer';

export default configureStore({
  reducer: {
    filter: FilterReducer,
    user: UserReducer,
    navbar: NavbarReducer
  },
});
