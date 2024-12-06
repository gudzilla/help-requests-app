import { notification } from '@/lib/notifications';
import { axiosInstance } from './axiosInstance';
import { AxiosError } from 'axios';

type AuthData = {
  login: string;
  password: string;
};

export const authRequest = async (data: AuthData) => {
  try {
    const response = await axiosInstance.post('/api/auth', data);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          notification('Неверный Логин или Пароль', 'error');
          break;
        case 500:
          notification('Запланированная ошибка сервера, попробуйте снова', 'error');
          break;
        default:
          notification(`Ошибка ${error.status}`, 'error');
      }
    } else console.error(error);
  }
};
