// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type AuthData = {
  login: string;
  password: string;
};

type AuthResponse = {
  auth: boolean;
  token: string;
};

// Define a service using a base URL and expected endpoints
export const helpEldersApi = createApi({
  reducerPath: 'helpEldersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  endpoints: (builder) => ({
    authentication: builder.query<AuthResponse, AuthData>({
      query: (userData) => ({
        url: '/auth',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAuthenticationQuery } = helpEldersApi;
