import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { SingleCard } from '@/components/singleCard';
import { DataForSingleCard } from '@/components/singleCard/types';
import { RTKQueryRequestError } from '@/lib/api/types';
import ErrorIcon from '@/assets/load-error.svg?react';
import NoResultsIcon from '@/assets/not-found-result.svg?react';

const StyleToStrechContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '64vh',
};

type HelpCardsProps = {
  cards: DataForSingleCard[];
  error: RTKQueryRequestError;
  isLoading: boolean;
  noResults: boolean | undefined;
  refetchRequests: () => void;
};

export const HelpCards = (props: HelpCardsProps) => {
  const { cards, error, isLoading, noResults, refetchRequests } = props;

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

  if (noResults) {
    return (
      <Box sx={StyleToStrechContainer}>
        <NoResultsIcon style={{ marginBottom: '24px' }} />
        <Typography variant="h5" paddingLeft={'62px'}>
          Запросы не найдены
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '818px' }}>
      {cards.map((request: DataForSingleCard) => {
        return <SingleCard key={request.id} dataForRequestCard={request} />;
      })}
    </Box>
  );
};
