import { TextField, Typography, useTheme } from '@mui/material';
import { OnFieldChange } from '../AuthForm';

type LoginInputProps = {
  onChange: OnFieldChange;
  // todo: set proper type for error
  error: any;
};

export const LoginInput = ({ onChange, error }: LoginInputProps) => {
  const theme = useTheme();

  return (
    <TextField
      id="login-input"
      label="Логин"
      type="text"
      placeholder="Введите e-mail"
      helperText={error ? 'Введите корректный email-адрес' : ''}
      fullWidth
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      onChange={(e) => onChange(e, 'login')}
      sx={{ marginBottom: 3 }}
    />
  );
};
