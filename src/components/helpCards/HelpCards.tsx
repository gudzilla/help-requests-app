import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { SingleCard } from '@/components/helpCards/singleCard';
import { RequestCardData } from '@/components/helpCards/singleCard/types';
import { RTKQueryRequestError } from '@/lib/api/types';
import NoResultsIcon from '@/assets/not-found-result.svg?react';
import { ResponsiveErrorIcon } from '../ResponsiveErrorIcon';
import { StatusPaper } from '../StatusPaper';
import { useScreenSize } from '@/lib/useScreenSize';

type HelpCardsProps = {
  cards: RequestCardData[];
  error: RTKQueryRequestError;
  isLoading: boolean;
  isEmpty: boolean | undefined;
  isEmptyMessage?: string;
  refetchRequests: () => void;
};

export const HelpCards = (props: HelpCardsProps) => {
  const {
    cards,
    error,
    isLoading,
    isEmpty,
    isEmptyMessage = 'Запросы не найдены',
    refetchRequests,
  } = props;

  const { isScreenMdDown } = useScreenSize();

  if (isLoading) {
    return (
      <StatusPaper>
        <CircularProgress size="5rem" />
      </StatusPaper>
    );
  }

  if (error) {
    return (
      <StatusPaper>
        <Stack gap={{ xs: '10px', md: '20px' }}>
          <ResponsiveErrorIcon />
          <Typography color="error" component="h2" variant={isScreenMdDown ? 'h6' : 'h5'}>
            Ошибка! Не удалось загрузить информацию
          </Typography>
          <Button variant="outlined" onClick={refetchRequests}>
            Повторить запрос
          </Button>
        </Stack>
      </StatusPaper>
    );
  }

  if (isEmpty) {
    return (
      <StatusPaper>
        <NoResultsIcon style={{ marginBottom: '24px' }} />
        <Typography variant="h5">{isEmptyMessage}</Typography>
      </StatusPaper>
    );
  }

  return (
    <Grid
      container
      rowSpacing={isScreenMdDown ? '16px' : '16px'}
      columnSpacing={isScreenMdDown ? '16px' : '24px'}
    >
      {cards.map((request: RequestCardData) => {
        return <SingleCard key={request.id} requestCardData={request} />;
      })}
    </Grid>
  );
};
