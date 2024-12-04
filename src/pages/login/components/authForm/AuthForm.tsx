import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PasswordInput } from './components/PasswordInput';
import { LoginInput } from './components/LoginInput';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authRequest } from '@/lib/api';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/store/authSlice';
import { notification } from '@/lib/notifications';
import { useIsAuthSelector } from '../../../../store/selectors';

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
  const isAuth = useIsAuthSelector();

  const {
    control,
    handleSubmit,
    reset,
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
    console.log(`login: ${data.login}\npassword: ${data.password}`);
    const result = await authRequest(data);
    console.log('------------------');
    console.log('Result');
    console.log('------------------');
    console.log(result);
    console.log(result.auth);
    if (result?.auth) {
      console.log('isAuth 1:', isAuth);
      dispatch(logIn());
      console.log('isAuth 1:', isAuth);
      notification('Вход выполнен', 'success');
      navigate('/help-catalog', { replace: true });
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
            loading={isLoading}
          >
            ВОЙТИ
          </LoadingButton>
          {/* <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{ width: '100%', marginTop: '15px' }}
          >
            Войти
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};
