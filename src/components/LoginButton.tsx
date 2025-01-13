import { Button, useTheme } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { notification } from '@/lib/notifications';

export const LoginButton = () => {
  const theme = useTheme();

  const buttonStyles = {
    'color': theme.palette.text.primary,
    'borderColor': theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
  };

  const handleClick = () => {
    notification('Введите данные в форму для входа');
  };

  return (
    <Button
      variant="outlined"
      size="medium"
      endIcon={<KeyboardArrowRightIcon />}
      onClick={handleClick}
      sx={buttonStyles}
    >
      Войти
    </Button>
  );
};
