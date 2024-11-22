import { Box, Grid2, useTheme } from '@mui/material';
import { AuthForm } from './components/authForm';

export const Login = () => {
  const theme = useTheme();

  const gridItemStyles = {
    height: '100%',
    padding: '64px 40px',
    borderColor: theme.palette.divider,
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100%' }}>
      <Grid2 container spacing={0} sx={{ height: '100%' }}>
        <Grid2
          size={6}
          sx={{
            borderLeft: 1,
            borderRight: 1,
            ...gridItemStyles,
          }}
        >
          <AuthForm />
        </Grid2>
        <Grid2
          size={6}
          sx={{
            borderRight: 1,
            ...gridItemStyles,
          }}
        >
          Test Users
        </Grid2>
      </Grid2>
    </Box>
  );
};
