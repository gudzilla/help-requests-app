import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { PasswordInput } from './components/PasswordInput';
import { LoginInput } from './components/LoginInput';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const FormInputsSchema = z.object({
  login: z.string().email({ message: 'Введите корректный email-адрес' }),
  password: z.string().min(8, { message: 'Введите корректный пароль' }),
});

type FormInputs = z.infer<typeof FormInputsSchema>;

const formStyles = {
  maxWidth: '485px',
  '& > :not(:last-child)': {
    marginBottom: '14px',
  },
};

// export const AuthForm = ({ loading, error, onSubmit }) => {
export const AuthForm = ({ loading, error }) => {
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert(`login: ${data.login}\npassword: ${data.password}`);
    console.log(data);
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
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{ width: '100%', marginTop: '15px' }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
