import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { PasswordInput } from './components/PasswordInput';
import { LoginInput } from './components/LoginInput';

export type FormStateType = {
  login: string;
  password: string;
};

export type OnFieldChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  field: keyof FormStateType
) => void;

export const AuthForm = ({ loading, error, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormStateType>({ login: '', password: '' });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Form Submited\nlogin: ${formState.login}\npassword: ${formState.password}`);
    onSubmit({ login: formState.login, password: formState.password });
  };

  const handleFieldChange: OnFieldChange = (event, field) => {
    const newFormState = {
      ...formState,
      [field]: event.target.value.trim(),
    };
    setFormState(newFormState);
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
          sx={{ maxWidth: '485px' }}
          onSubmit={handleFormSubmit}
          noValidate
          autoComplete="off"
        >
          <LoginInput onChange={handleFieldChange} error={error} />
          <PasswordInput
            onChange={handleFieldChange}
            showPassword={showPassword}
            onVisibilityClick={handleClickShowPassword}
            error={error}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{ width: '100%', marginTop: '15px' }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
