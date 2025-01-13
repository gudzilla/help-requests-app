import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PasswordInput } from './components/PasswordInput';
import { LoginInput } from './components/LoginInput';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/store/authenticationSlice';
import { notification } from '@/lib/notifications';
import { useAuthenticateMutation } from '@/lib/api/api';

const FormInputsSchema = z.object({
  login: z.string().email({ message: 'Введите корректный email-адрес' }),
  password: z.string().min(8, { message: 'Введите корректный пароль' }),
});

export type FormInputs = z.infer<typeof FormInputsSchema>;

// type AuthFormProps = {};

const formStyles = {
  'maxWidth': '485px',
  '& > :not(:last-child)': {
    marginBottom: '14px',
  },
};

// export const AuthForm = ({ loading, error, onSubmit }) => {
export const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authenticate, { data: authData, isLoading: authIsLoading, error: authError }] =
    useAuthenticateMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: zodResolver(FormInputsSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    // RTK QUERY API
    try {
      const response = await authenticate(formData).unwrap();
      if (response?.auth) {
        dispatch(logIn(response.token));
        notification('Вход выполнен', 'success');
        navigate('/help-catalog', { replace: true });
      }
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

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gap: '90px',
      }}
    >
      <Typography variant="h4" component="h1">
        Авторизация
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '30px',
        }}
      >
        <Typography component="h3" variant="h5">
          Вход
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          sx={formStyles}
        >
          <Controller
            name="login"
            control={control}
            render={({ field }) => <LoginInput field={field} errors={errors} />}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                field={field}
                showPassword={showPassword}
                onVisibilityClick={handleClickShowPassword}
                errors={errors}
              />
            )}
          />
          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            sx={{ width: '100%', marginTop: '15px' }}
            loading={authIsLoading}
          >
            ВОЙТИ
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};
