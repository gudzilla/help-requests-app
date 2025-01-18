import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { notification } from '@/lib/notifications';
import { logOutFx } from '@/store/authenticationSlice';

type ServerError = {
  status: number;
  data: { message: string };
};

type ErrorHandlerArgs = {
  // todo: delete
  // err: FetchBaseQueryError | SerializedError;
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
  console.log('Внутри errorHandler');
  if (isFetchBaseQueryError(err)) {
    if (isServerError(err)) {
      console.error(err);
      // todo: delete later | catching 403 error
      if (err.status === 403) {
        notification('Token Expired. Relogin', 'error');
        dispatch(logOutFx());
      }
      notification(`Ошибка ${err.status}: ${(err as ServerError).data.message}`, 'error');
    } else {
      switch (err.status) {
        // Сюда попадет запланированная ошибка сервера с кодом 500.
        // Так как на беке вернули не JSON в error.data
        case 'PARSING_ERROR':
          console.error(err);
          notification(`Ошибка ${err.originalStatus}: ${err.data}`, 'error');
          break;
        default:
          console.log(err.error);
          notification(`Ошибка ${err.status}: ${err.error}`, 'error');
      }
    }
  }

  if (isErrorWithMessage(err)) {
    console.error('Error with message:', err);
    notification(err.message, 'error');
  }
};
