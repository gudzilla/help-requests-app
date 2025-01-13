import { Box, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { notification } from '../../../lib/notifications';
import { useNavigate } from 'react-router-dom';

type RequestCardsParams = {
  data: any;
  isLoading: boolean;
  error: any;
};

type MinimizedData = {
  id: number;
  title: string;
};

export const RequestCards = ({ error, isLoading, data }: RequestCardsParams) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log('Error: ', error);
    // todo: if NO TOKEN (expired) - need to log out and make state isAuth - false
    notification(`${error?.originalStatus}. ${error.data}`, 'error');
    return (
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <Typography mb={2}>Ошибка Сервера. Попробуйте снова</Typography>
        <ErrorIcon />
      </Box>
    );
  }

  return (
    <Box>
      {data.map((item: MinimizedData, index: number) => {
        return (
          <Typography
            variant="h6"
            key={index}
            onClick={() => {
              navigate(`/help-catalog/${item.id}`);
            }}
            sx={{
              'cursor': 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {item.title}
          </Typography>
        );
      })}
    </Box>
  );
};
