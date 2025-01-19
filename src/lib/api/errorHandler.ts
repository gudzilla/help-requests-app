import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { notification } from '@/lib/notifications';
import { logOutFx } from '@/store/authenticationSlice';

type ServerError = {
  status: number;
  data: { message: string };
};

type ErrorHandlerArgs = {
  err: unknown;
  dispatch: AppDispatch;
};

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

const isServerError = (
  err: FetchBaseQueryError
): err is { status: number; data: unknown } => {
  return !('error' in err);
};

export const errorHandler = ({ err, dispatch }: ErrorHandlerArgs) => {
  if (isFetchBaseQueryError(err)) {
    if (isServerError(err)) {
      console.error(err);
      if (err.status === 403) {
        notification('Token Expired. Relogin', 'error');
        dispatch(logOutFx());
      } else {
        notification(
          `Ошибка ${err.status}: ${(err as ServerError).data.message}`,
          'error'
        );
      }
    } else {
      switch (err.status) {
        // Сюда попадет запланированная ошибка сервера с кодом 500.
        // Так как на беке вернули не JSON в error.data
        case 'PARSING_ERROR':
          console.error('PARSING_ERROR: ', err);
          break;
        default:
          console.error(err.error);
          notification(`Ошибка ${err.status}: ${err.error}`, 'error');
      }
    }
  }

  if (isErrorWithMessage(err)) {
    console.error('Error with message:', err);
    notification(err.message, 'error');
  }
};
