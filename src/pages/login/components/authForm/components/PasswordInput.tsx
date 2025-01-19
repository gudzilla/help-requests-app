import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';
import { FormInputs } from '../types';

type PasswordInputProps = {
  field: ControllerRenderProps<FormInputs, 'password'>;
  showPassword: boolean;
  onVisibilityClick: () => void;
  errors: FieldErrors<FormInputs> | undefined;
};

export const PasswordInput = ({
  field,
  errors,
  showPassword,
  onVisibilityClick,
}: PasswordInputProps) => {
  return (
    <TextField
      {...field}
      label="Пароль"
      placeholder="Введите пароль"
      variant="outlined"
      helperText={errors?.password ? errors.password.message : '\u200B'}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={onVisibilityClick}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
