import { TextField } from '@mui/material';
import { FormInputs } from '../AuthForm';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';

type LoginInputProps = {
  field: ControllerRenderProps<FormInputs, 'login'>;
  errors: FieldErrors<FormInputs> | undefined;
};

export const LoginInput = ({ field, errors }: LoginInputProps) => {
  return (
    <TextField
      {...field}
      id="login-input"
      label="Логин"
      type="text"
      placeholder="Введите e-mail"
      error={!!errors?.login}
      helperText={errors?.login ? errors.login.message : '\u200B'}
      fullWidth
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
    />
  );
};
