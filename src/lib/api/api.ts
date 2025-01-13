import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { HelpRequestData } from './types';

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

type HelpRequestId = Pick<HelpRequestData, 'id'>;

type HelpCatalogResponse = HelpRequestData[];

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
    getRequests: builder.query<HelpCatalogResponse, void>({
      query: () => '/request',
    }),
    getRequestById: builder.query<HelpRequestData, HelpRequestId>({
      query: (requestId) => `/request/${requestId}`,
    }),
  }),
});

export const { useAuthenticateMutation, useGetRequestsQuery, useGetRequestByIdQuery } =
  helpEldersApi;
