import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PasswordInput } from './components/PasswordInput';
import { LoginInput } from './components/LoginInput';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authRequest } from '@/lib/api';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/store/authenticationSlice';
import { notification } from '@/lib/notifications';
import { AxiosError } from 'axios';

const FormInputsSchema = z.object({
  login: z.string().email({ message: 'Введите корректный email-адрес' }),
  password: z.string().min(8, { message: 'Введите корректный пароль' }),
});

export type FormInputs = z.infer<typeof FormInputsSchema>;

type AuthFormProps = {};

const formStyles = {
  'maxWidth': '485px',
  '& > :not(:last-child)': {
    marginBottom: '14px',
  },
};

// export const AuthForm = ({ loading, error, onSubmit }) => {
export const AuthForm = ({ loading, error, onSubmitApi }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    try {
      const result = await authRequest(data);
      if (result?.auth) {
        dispatch(logIn());
        notification('Вход выполнен', 'success');
        navigate('/help-catalog', { replace: true });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notification(`Ошибка ${error.code}: ${error.message}`);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
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
        {/* TOOGLE LOADING from useState FOR BUTTON */}
        {/* <Button
          onClick={() => {
            const value = isLoading;
            setIsLoading(!value);
          }}
        >
          Toggle Loading
        </Button> */}
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
            loading={isLoading}
          >
            ВОЙТИ
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};
