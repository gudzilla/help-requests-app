import { Box, Button, CircularProgress, Grid2, Stack, Typography } from '@mui/material';
import { SingleCard } from '@/components/helpCards/singleCard';
import { DataForSingleCard } from '@/components/helpCards/singleCard/types';
import { RTKQueryRequestError } from '@/lib/api/types';
import ErrorIcon from '@/assets/load-error.svg?react';
import NoResultsIcon from '@/assets/not-found-result.svg?react';

const StyleToStrechContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '30px',
  height: { md: '40vh', lg: '64vh' },
};

type HelpCardsProps = {
  cards: DataForSingleCard[];
  error: RTKQueryRequestError;
  isLoading: boolean;
  hasNoResults: boolean | undefined;
  messageForNoResults?: string;
  refetchRequests: () => void;
};

export const HelpCards = (props: HelpCardsProps) => {
  const {
    cards,
    error,
    isLoading,
    hasNoResults,
    messageForNoResults = 'Запросы не найдены',
    refetchRequests,
  } = props;

  if (isLoading) {
    return (
      <Box sx={StyleToStrechContainer}>
        <CircularProgress size="5rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={StyleToStrechContainer}>
        <Stack gap={'24px'}>
          <ErrorIcon style={{ alignSelf: 'center' }} />
          <Typography color="error" variant="h5">
            Ошибка! Не удалось загрузить информацию
          </Typography>
          <Button variant="outlined" onClick={refetchRequests}>
            Повторить запрос
          </Button>
        </Stack>
      </Box>
    );
  }

  if (hasNoResults) {
    return (
      <Box sx={StyleToStrechContainer}>
        <NoResultsIcon style={{ marginBottom: '24px' }} />
        <Typography variant="h5">{messageForNoResults}</Typography>
      </Box>
    );
  }

  return (
    <Grid2 container rowSpacing="16px" columnSpacing="24px">
      {cards.map((request: DataForSingleCard) => {
        return <SingleCard key={request.id} dataForRequestCard={request} />;
      })}
    </Grid2>
  );
};
