// import { Middleware } from '@reduxjs/toolkit';

// // Определяем тип экшена вручную
// type LogInAction = {
//   type: 'isAuth/logIn';
//   payload: string;
// };
// type LogOutAction = {
//   type: 'isAuth/logOut';
// };

// export const authMiddleware: Middleware<RootState> = () => (next) => (action) => {
//   if (
//     (action as LogInAction).type === 'isAuth/logIn' &&
//     (action as LogInAction).payload
//   ) {
//     localStorage.setItem('jwtToken', (action as LogInAction).payload);
//   }

//   if ((action as LogOutAction).type === 'isAuth/logOut') {
//     localStorage.removeItem('jwtToken');
//   }
//   return next(action);
// };
