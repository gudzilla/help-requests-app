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
import { useAuthenticateMutation } from '@/lib/api/api';
import { authRequest } from '@/lib/api/apiAuthRequest';

const FormInputsSchema = z.object({
  login: z.string().email({ message: 'Введите корректный email-адрес' }),
  password: z.string().min(8, { message: 'Минимальная длинна пароля 8 символов' }),
});

export type FormInputs = z.infer<typeof FormInputsSchema>;

const formStyles = {
  'maxWidth': '485px',
  '& > :not(:last-child)': {
    marginBottom: '14px',
  },
};

export const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authenticate, { isLoading: authIsLoading }] = useAuthenticateMutation();

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

  const onSubmit: SubmitHandler<FormInputs> = async (logInFormData) => {
    authRequest(authenticate, logInFormData, dispatch, navigate);
  };

  return (
    <Box component="section">
      <Typography variant="h4" component="h1" marginBottom={'90px'}>
        Авторизация
      </Typography>
      <Box>
        <Typography component="h3" variant="h5" marginBottom={'30px'}>
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
