import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    logIn: () => true,
    logOut: () => false,
  },
});

export const { logIn, logOut } = isAuthSlice.actions;

export default isAuthSlice.reducer;
