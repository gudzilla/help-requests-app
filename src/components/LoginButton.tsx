import { Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const LoginButton = () => {
  // todo: delete?
  // const navigate = useNavigate();
  const theme = useTheme();

  const buttonStyles = {
    'color': theme.palette.text.primary,
    'borderColor': theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
  };

  return (
    <Button
      variant="outlined"
      size="medium"
      endIcon={<KeyboardArrowRightIcon />}
      // onClick={}
      sx={buttonStyles}
    >
      Войти
    </Button>
  );
};
