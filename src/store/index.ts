import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { helpEldersApi } from '@/lib/api/api';

export const store = configureStore({
  reducer: {
    isAuth: authenticationSlice,
    [helpEldersApi.reducerPath]: helpEldersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpEldersApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
