import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { helpEldersApi } from '@/lib/api/rtkQuery';

export const store = configureStore({
  reducer: {
    isAuth: authenticationSlice,
    [helpEldersApi.reducerPath]: helpEldersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpEldersApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommqentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
