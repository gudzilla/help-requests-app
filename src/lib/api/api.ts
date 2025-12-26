import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HelpRequest, User } from './types';
import { notification } from '../notifications';
import { errorHandler } from './errorHandler';
import { NavigateFunction } from 'react-router-dom';
import { logInFx } from '@/store/authenticationReducer';

export type PARSING_ERROR = {
  /**
   * * `"PARSING_ERROR"`:
   *   An error happened during parsing.
   *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
   *   or an error occurred while executing a custom `responseHandler`.
   **/
  status: 'PARSING_ERROR';
  originalStatus: number;
  data: string;
  error: string;
};

export type ServerError = {
  status: number;
  data: unknown;
};

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

export type FavoritesResponse = HelpRequest['id'][];

type OnQueryStartError = {
  error: unknown;
  isUnhandledError?: boolean;
  meta?: {
    request?: Record<string, unknown>;
    response?: Record<string, unknown>;
  };
};

function isOnQueryStartError(error: unknown): error is OnQueryStartError {
  return typeof error === 'object' && error != null && 'error' in error;
}

type HelpRequestId = HelpRequest['id'];

export type HelpCatalogResponse = HelpRequest[];

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
          if (data.auth) {
            dispatch(logInFx(data.token));
            navigate('/help-catalog', { replace: true });
          }
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
    getRequests: builder.query<HelpRequest[], void>({
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
    getRequestById: builder.query<HelpRequest, HelpRequestId>({
      query: (requestId) => `/request/${requestId}`,
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
    getUser: builder.query<User, void>({
      query: () => `/user`,
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
    getFavourites: builder.query<FavoritesResponse, void>({
      query: () => `/user/favourites`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: unknown) {
          console.error(error);
          if (isOnQueryStartError(error)) {
            if ((error.error as PARSING_ERROR).originalStatus === 500) {
              // todo: handle errors Это оч грубо. Может ли быть постоянно это ошибка?
              // ТОгда будет бесконечный повтор запросов
              dispatch(
                helpEldersApi.endpoints.getFavourites.initiate(undefined, {
                  forceRefetch: true,
                })
              );
            }
            // todo: delete
            // errorHandler({ err: error.error, dispatch });
          }
        }
      },
    }),

    addToFavourites: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/user/favourites/`,
        method: 'POST',
        body: { requestId },
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            helpEldersApi.endpoints.getFavourites.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error: unknown) {
          notification('Ошибка добавления в избранное.', 'error');
          if (isOnQueryStartError(error)) {
            // todo: handle errors отдельный тост для ошибки 400 ?
            errorHandler({ err: error.error, dispatch });
          }
        }
      },
    }),
    deleteFromFavourites: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/user/favourites/${requestId}`,
        method: 'DELETE',
        body: { requestId },
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            helpEldersApi.endpoints.getFavourites.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error: unknown) {
          notification('Ошибка удаления из избранного.', 'error');
          if (isOnQueryStartError(error)) {
            // todo: handle errors отдельный тост для ошибки 400 ?
            errorHandler({ err: error.error, dispatch });
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
  useGetFavouritesQuery,
  useContributionMutation,
  useGetUserQuery,
  useAddToFavouritesMutation,
  useDeleteFromFavouritesMutation,
} = helpEldersApi;
