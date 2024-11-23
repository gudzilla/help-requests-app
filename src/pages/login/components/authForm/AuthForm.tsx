import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// todo: add ()
export const AuthForm = ({ loading, error, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit({ login, password });
  };

  const handleLoginInputChange = (event) => {
    setLogin(event.target.value.trim());
  };

  const handlePassInputChange = (event) => {
    setPassword(event.target.value.trim());
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
        <Typography variant="h5">Вход</Typography>
        <Box
          component="form"
          sx={{ maxWidth: '485px' }}
          onSubmit={handleFormSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="login-input"
            label="Логин"
            type="text"
            placeholder="Введите e-mail"
            helperText={
              error ? (
                <span style={{ color: theme.palette.error.main }}>
                  {' '}
                  {'Введите корректный email-адрес'}
                </span>
              ) : (
                ''
              )
            }
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 3 }}
            onChange={handleLoginInputChange}
          />

          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel htmlFor="outlined-adornment-password" shrink>
              Пароль
            </InputLabel>
            <OutlinedInput
              notched
              placeholder="Введите пароль"
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePassInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {error && (
              <FormHelperText sx={{ color: theme.palette.error.main }}>
                {'Введите корректный пароль'}
              </FormHelperText>
            )}{' '}
          </FormControl>
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
