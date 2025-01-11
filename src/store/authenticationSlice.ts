import { createSlice } from '@reduxjs/toolkit';

type AuthState = boolean;

const initialState: AuthState = localStorage.getItem('isAuth') == 'true';

const authenticationSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    logIn: () => {
      // todo: delete
      localStorage.setItem('isAuth', 'true');
      return true;
    },
    logOut: () => {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('jwtToken');
      return false;
    },
  },
});

export const { logIn, logOut } = authenticationSlice.actions;

export default authenticationSlice.reducer;
