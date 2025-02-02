import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HelpRequestData } from './types';
import { logInFx } from '@/store/authenticationReducer';
import { notification } from '../notifications';
import { errorHandler } from './errorHandler';
import { NavigateFunction } from 'react-router-dom';

type AuthData = {
  loginFormData: {
    login: string;
    password: string;
  };
  navigate: NavigateFunction;
};

type AuthResponse = {
  auth: boolean;
  token: string;
};

type FavoritesResponse = string[];

type OnQueryStartError = {
  error: unknown;
  isUnhandledError?: boolean;
  meta?: {
    request?: Record<string, any>;
    response?: Record<string, any>;
  };
};

function isOnQueryStartError(error: unknown): error is OnQueryStartError {
  return typeof error === 'object' && error != null && 'error' in error;
}

type HelpRequestId = HelpRequestData['id'];

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
      // todo: должен ли еще принимать navigate?
      query: ({ loginFormData }) => ({
        url: '/auth',
        method: 'POST',
        body: loginFormData,
      }),
      async onQueryStarted({ navigate }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.auth) {
            dispatch(logInFx(data.token));
            notification('Вход выполнен', 'success');
            navigate('/help-catalog', { replace: true });
          }
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
    getRequests: builder.query<HelpRequestData[], void>({
      query: () => '/request',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch });
          }
        }
      },
    }),
    getRequestById: builder.query<HelpRequestData, HelpRequestId>({
      // todo: тост на 500 ошибку НЕ нужен
      query: (requestId) => `/request/${requestId}`,
    }),
    getFavorites: builder.query<FavoritesResponse, void>({
      // todo: ошибка 500 показать ТОСТ
      query: () => `/user/favorites`,
    }),
    contribution: builder.mutation<string, string>({
      query: (requestId) => ({
        url: `/request/${requestId}/contribution`,
        method: 'POST',
        body: { requestId },
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notification('Успех! Спасибо за помощь', 'success');
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
  }),
});

export const {
  useAuthenticateMutation,
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useGetFavoritesQuery,
  useContributionMutation,
} = helpEldersApi;
