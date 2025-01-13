import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = boolean;

const initialState: AuthState = localStorage.getItem('isAuth') === 'true';

const authenticationSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    logIn: (_, action: PayloadAction<string>) => {
      localStorage.setItem('jwtToken', action.payload);
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
