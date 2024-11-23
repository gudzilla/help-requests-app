import { Alert, AlertTitle, Box, Typography } from '@mui/material';

export const TestUsers = () => {
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gap: '90px',
      }}
    >
      <Typography variant="h4" component="h2">
        Тестовые профили
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '30px',
          maxWidth: '320px',
          // Height to fit exactly 3 alerts
          // for more you need to scroll
          maxHeight: '356px',
          overflowY: 'scroll',
        }}
      >
        <Alert severity="info" variant="outlined">
          <AlertTitle>Первый пользователь</AlertTitle>
          <Typography variant="body2">Логин: test1example@gmail.com</Typography>
          <Typography variant="body2">Пароль: qwerty123</Typography>
        </Alert>
        <Alert severity="info" variant="outlined">
          <AlertTitle>Второй пользователь</AlertTitle>
          <Typography variant="body2">Логин: test2example@gmail.com</Typography>
          <Typography variant="body2">Пароль: qwerty123</Typography>
        </Alert>
        <Alert severity="info" variant="outlined">
          <AlertTitle>Третий пользователь</AlertTitle>
          <Typography variant="body2">Логин: test3example@gmail.com</Typography>
          <Typography variant="body2">Пароль: qwerty123</Typography>
        </Alert>
      </Box>
    </Box>
  );
};
