import { Box } from '@mui/material';
import { DataForRequestCard, RequestCard } from './RequestCard';
import { RTKQueryRequestError } from '@/lib/api/types';
import { ResultsError } from './ResultsError';
import { ResultsLoading } from './ResultsLoading';

const StyleForErrorAndLoading = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '816px',
};

type ResultsProps = {
  cards: [] | DataForRequestCard[];
  error: RTKQueryRequestError;
  isLoading: boolean;
};
export const Results = (props: ResultsProps) => {
  const { cards, error, isLoading } = props;

  if (error) {
    return (
      <Box sx={StyleForErrorAndLoading}>
        <ResultsError />
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={StyleForErrorAndLoading}>
        <ResultsLoading />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {cards.map((request: DataForRequestCard) => {
        return (
          <RequestCard key={request.title} dataForRequestCard={request} view="large" />
        );
      })}
    </Box>
  );
};
