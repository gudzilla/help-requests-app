import { Box, CircularProgress, Typography } from '@mui/material';
import { SingleCard } from './singleCard/SingleCard';
import { RTKQueryRequestError } from '@/lib/api/types';
import ErrorIcon from '@/assets/load-error.svg?react';
import NoResults from '@/assets/not-found-result.svg?react';
import { DataForSingleCard } from './singleCard/types';

const StyleForErrorAndLoading = {
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
};
export const HelpCards = (props: HelpCardsProps) => {
  const { cards, error, isLoading, noResults } = props;

  if (isLoading) {
    return (
      <Box sx={StyleForErrorAndLoading}>
        <CircularProgress size="5rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={StyleForErrorAndLoading}>
        <ErrorIcon style={{ marginBottom: '24px' }} />
        <Typography color="error" variant="h5">
          Ошибка! Не удалось загрузить информацию
        </Typography>
      </Box>
    );
  }

  if (noResults) {
    return (
      <Box sx={StyleForErrorAndLoading}>
        <NoResults style={{ marginBottom: '24px' }} />
        <Typography variant="h5" paddingLeft={'62px'}>
          Запросы не найдены
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '818px' }}>
      {cards.map((request: DataForSingleCard) => {
        return <SingleCard key={request.id} dataForRequestCard={request} view="large" />;
      })}
    </Box>
  );
};
