import { Box, Paper, Stack, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { TrashCards } from '../TrashCards';
import { DataForRequestCard, RequestCard } from './RequestCard';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from './transformToRequestCardProps';

export const HelpRequestsView = () => {
  const { data: helpRequestsData, isLoading, error } = useGetRequestsQuery();

  let cardsPage: DataForRequestCard[] | [] = [];

  if (helpRequestsData) {
    const pageSlice = helpRequestsData.slice(0, 3);
    cardsPage = transformDataForCardsView(pageSlice);
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <Typography mb={2}>Ошибка Сервера. Попробуйте снова</Typography>
        <ErrorIcon />
      </Box>
    );
  }

  return (
    <Paper>
      <Box>
        <Stack padding="12px 36px 40px 36px">
          <Typography variant="h6">Найдено: 33</Typography>
          {/* <TrashCards /> */}
          {/* <Box sx={{ display: 'flex', gap: '24px' }}> */}
          <Box sx={{ display: 'flex' }}>
            {cardsPage.map((request: DataForRequestCard) => {
              return (
                <RequestCard
                  key={request.title}
                  dataForRequestCard={request}
                  view="large"
                />
              );
            })}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};
