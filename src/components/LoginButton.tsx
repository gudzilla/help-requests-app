import { Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const LoginButton = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const buttonStyles = {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Button
      variant="outlined"
      size="medium"
      // color="warning"
      endIcon={<KeyboardArrowRightIcon />}
      onClick={handleClick}
      sx={buttonStyles}
    >
      Войти
    </Button>
  );
};
