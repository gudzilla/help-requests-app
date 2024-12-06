import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';

export const store = configureStore({
  reducer: {
    isAuth: authenticationSlice,
  },
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommqentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
