import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { OnFieldChange } from '../AuthForm';

type PasswordInputProps = {
  onChange: OnFieldChange;
  showPassword: boolean;
  onVisibilityClick: () => void;
  // todo: set proper type for error
  error: any;
};

export const PasswordInput = ({
  error,
  showPassword,
  onChange,
  onVisibilityClick,
}: PasswordInputProps) => {
  return (
    <TextField
      sx={{ marginBottom: 2 }}
      onChange={(e) => {
        onChange(e, 'password');
      }}
      label="Пароль"
      placeholder="Введите пароль"
      variant="outlined"
      helperText={error ? 'Введите корректный пароль' : '\u200B'}
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
