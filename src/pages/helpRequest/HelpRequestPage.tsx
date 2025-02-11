import { Stack, Typography } from '@mui/material';
import { Request } from './Request';

// todo: figure out how to add a Route and where to make API call
export const HelpRequestPage = () => {
  return (
    <Stack padding="30px 40px" spacing={2}>
      <Typography component="h1" variant="h4">
        Запрос о помощи
      </Typography>
      <Request />
    </Stack>
  );
};
