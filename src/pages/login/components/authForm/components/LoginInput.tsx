import { TextField } from '@mui/material';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';
import { FormInputs } from '../types';

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
