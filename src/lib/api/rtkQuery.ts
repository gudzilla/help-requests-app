// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// Type for error
export type RTKQueryError = FetchBaseQueryError | SerializedError;

type AuthData = {
  login: string;
  password: string;
};

type AuthResponse = {
  auth: boolean;
  token: string;
};

type HelpRequestId = string;

// todo: use a type
type HelpCatalogResponse = any[];

// todo: use a type
type HelpRequest = {};

export const helpEldersApi = createApi({
  reducerPath: 'helpEldersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.mutation<AuthResponse, AuthData>({
      query: (userData) => ({
        url: '/auth',
        method: 'POST',
        body: userData,
      }),
    }),
    // add types
    getRequests: builder.query<HelpCatalogResponse, void>({
      query: () => '/request',
    }),
    getRequestById: builder.query<HelpRequest, HelpRequestId>({
      query: (requestId) => `/request/${requestId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAuthenticateMutation, useGetRequestsQuery, useGetRequestByIdQuery } =
  helpEldersApi;
