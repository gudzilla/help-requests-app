import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HelpRequestData } from './types';
import { logInFx } from '@/store/authenticationSlice';
import { notification } from '../notifications';
import { errorHandler } from './errorHandler';
import { NavigateFunction } from 'react-router-dom';

// WITH onQueryStarted
type AuthData = {
  loginFormData: {
    login: string;
    password: string;
  };
  navigate: NavigateFunction;
};

// WITH apiAuthRequest
// type AuthData = {
//   login: string;
//   password: string;
// };

type AuthResponse = {
  auth: boolean;
  token: string;
};

type OnQueryStartError = {
  error?: unknown;
  isUnhandledError?: boolean;
  meta?: {
    request?: Record<string, any>;
    response?: Record<string, any>;
  };
};

type HelpRequestId = Pick<HelpRequestData, 'id'>;

export type HelpCatalogResponse = HelpRequestData[];

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
      query: ({ loginFormData }) => ({
        url: '/auth',
        method: 'POST',
        body: loginFormData,
      }),
      async onQueryStarted({ navigate }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(logInFx(data.token));
          notification('Вход выполнен', 'success');
          navigate('/help-catalog', { replace: true });
        } catch (error: unknown) {
          const typedError = error as OnQueryStartError;
          errorHandler({ err: typedError.error, dispatch });

          // todo: delete
          // console.log(`Ошибка поймана внутри onQueryStarted.`);
          // console.error('Ошибка onQueryStarted: ', error); // Вывод ошибки в читабельном формате
          // console.log('Ошибка (JSON):', JSON.stringify(error, null, 2)); // Строковый формат
          // errorHandler({ err: error.error, dispatch });
        }
      },
    }),
    getRequests: builder.query<HelpCatalogResponse, void>({
      query: () => '/request',
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Ошибка на getRequests=>onQueryStarted ', error);
        }
      },
    }),
    getRequestById: builder.query<HelpRequestData, HelpRequestId>({
      query: (requestId) => `/request/${requestId}`,
    }),
  }),
});

export const { useAuthenticateMutation, useGetRequestsQuery, useGetRequestByIdQuery } =
  helpEldersApi;
