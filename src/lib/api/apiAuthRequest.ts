import { notification } from '@/lib/notifications';
import { logIn } from '@/store/authenticationSlice';
import { NavigateFunction } from 'react-router-dom';
import { useAuthenticateMutation } from './api';

type AuthenticateFunction = ReturnType<typeof useAuthenticateMutation>[0];

type LogInData = {
  login: string;
  password: string;
};

export const authRequest = async (
  apiRequestFunction: AuthenticateFunction,
  data: LogInData,
  dispatch: RootDispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await apiRequestFunction(data).unwrap();
    if (response?.auth) {
      dispatch(logIn(response.token));
      notification('Вход выполнен', 'success');
      navigate('/help-catalog', { replace: true });
    }
    // todo: add normal error handler
  } catch (error: any) {
    if (error.status === 400) {
      notification(`Ошибка ${error.status}: Неверный логин или пароль`, 'error');
    } else if (error.originalStatus === 500) {
      notification(
        `Ошибка ${error.originalStatus}: Запланированная ошибка сервера, попробуйте снова`,
        'error'
      );
    } else {
      console.error('Unknown Error:', error);
    }
  }
};
