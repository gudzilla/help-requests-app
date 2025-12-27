import { Stack, Typography } from '@mui/material';
import { Request } from './Request';

export const HelpRequestPage = () => {
  return (
    <Stack padding={{ xs: '20px 16px', md: '30px 40px' }} spacing={2}>
      <Typography
        component="h1"
        variant="h4"
        paddingLeft={{ xs: '16px', md: 0 }}
      >
        Запрос о помощи
      </Typography>
      <Request />
    </Stack>
  );
};
