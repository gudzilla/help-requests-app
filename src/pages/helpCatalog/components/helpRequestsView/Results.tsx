import { Box, Typography } from '@mui/material';
import { DataForRequestCard, RequestCard } from './RequestCard';
import ErrorIcon from '@/assets/load-error.svg?react';

export const Results = ({ cardsPage, error }) => {
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '816px',
        }}
      >
        <ErrorIcon style={{ marginBottom: '24px' }} />
        <Typography color="error" variant="h5">
          Ошибка! Не удалось загрузить информацию
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {cardsPage.map((request: DataForRequestCard) => {
        return (
          <RequestCard key={request.title} dataForRequestCard={request} view="large" />
        );
      })}
    </Box>
  );
};
