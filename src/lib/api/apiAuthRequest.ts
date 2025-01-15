import { notification } from '@/lib/notifications';
import { logInFx } from '@/store/authenticationSlice';
import { NavigateFunction } from 'react-router-dom';
import { useAuthenticateMutation } from './api';
import { errorHandler } from './errorHandler';

type AuthenticateFunction = ReturnType<typeof useAuthenticateMutation>[0];

type LogInData = {
  login: string;
  password: string;
};

export const authRequest = async (
  apiRequestFunction: AuthenticateFunction,
  data: LogInData,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await apiRequestFunction(data).unwrap();
    if (response?.auth) {
      dispatch(logInFx(response.token));
      notification('Вход выполнен', 'success');
      navigate('/help-catalog', { replace: true });
    }
  } catch (error: any) {
    errorHandler(error);
  }
};
