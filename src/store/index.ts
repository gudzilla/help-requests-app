import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { helpEldersApi } from '@/lib/api/api';
import filtersSlice from '@/pages/helpCatalog/state/filtersSlice';
import { authenticationReducer } from './authenticationReducer';

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    filters: filtersSlice,
    [helpEldersApi.reducerPath]: helpEldersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpEldersApi.middleware),
});

setupListeners(store.dispatch);
