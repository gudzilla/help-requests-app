import { createSlice } from '@reduxjs/toolkit';

type AuthState = boolean;

// todo: можно проверить по токену
const initialState: AuthState = Boolean(localStorage.getItem('jwtToken'));

const authenticationSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    logIn: () => {
      return true;
    },
    logOut: () => {
      return false;
    },
  },
});

export const { logIn, logOut } = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const logInFx = (token: string) => (dispatch: AppDispatch) => {
  localStorage.setItem('jwtToken', token);

  dispatch(logIn());
};

export const logOutFx = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('jwtToken');

  dispatch(logOut());
};
