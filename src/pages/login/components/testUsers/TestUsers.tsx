import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { accounts } from './constants';

export const TestUsers = () => {
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gap: '90px',
      }}
    >
      <Typography component="h2" variant="h4">
        Тестовые профили
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '30px',
          maxWidth: '320px',
          // Height to fit exactly 3 alerts
          // if you have more you need to scroll
          maxHeight: '356px',
          overflowY: 'scroll',
        }}
      >
        {accounts.map(({ title, login, password }, index) => (
          <Alert severity="info" variant="outlined" key={index} onClick={() => {}}>
            <AlertTitle>{title}</AlertTitle>
            <Typography variant="body2">{`Логин: ${login}`}</Typography>
            <Typography variant="body2">{`Пароль: ${password}`}</Typography>
          </Alert>
        ))}
      </Box>
    </Box>
  );
};
