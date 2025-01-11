import { Box, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { notification } from '../../lib/notifications';

type RequestCardsParams = {
  data: any;
  isLoading: boolean;
  error: any;
};
export const RequestCards = ({ error, isLoading, data }: RequestCardsParams) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log('Error: ', error);
    // todo: if NO TOKEN (expired) - need to log out and make state isAuth - false
    notification(`Ошибка ${error?.status}. ${error.data.message}`, 'error');
    return (
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <Typography mb={2}>Ошибка Сервера. Попробуйте снова</Typography>
        <ErrorIcon />
      </Box>
    );
  }

  return (
    <Box>
      {data.map((title, index) => {
        return (
          <Typography variant="h6" key={index}>
            {title}
          </Typography>
        );
      })}
    </Box>
  );
};
