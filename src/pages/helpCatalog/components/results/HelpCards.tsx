import { Box, CircularProgress, Typography } from '@mui/material';
import { DataForSingleCard, SingleCard } from './singleCard/SingleCard';
import { RTKQueryRequestError } from '@/lib/api/types';
import ErrorIcon from '@/assets/load-error.svg?react';

const StyleForErrorAndLoading = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '816px',
};

type HelpCardsProps = {
  cards: [] | DataForSingleCard[];
  error: RTKQueryRequestError;
  isLoading: boolean;
};
export const HelpCards = (props: HelpCardsProps) => {
  const { cards, error, isLoading } = props;

  if (isLoading) {
    return (
      <Box sx={StyleForErrorAndLoading}>
        <CircularProgress size="5rem" />;
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
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {cards.map((request: DataForSingleCard) => {
        return (
          <SingleCard key={request.title} dataForRequestCard={request} view="large" />
        );
      })}
    </Box>
  );
};
