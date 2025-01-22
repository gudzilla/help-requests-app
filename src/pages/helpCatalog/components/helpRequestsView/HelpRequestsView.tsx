import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DataForRequestCard } from './RequestCard';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from './transformToRequestCardProps';

import { Results } from './Results';
import { SetViewButtons } from './SetViewButtons';

export const HelpRequestsView = () => {
  const { data: helpRequestsData, isLoading, error } = useGetRequestsQuery();

  let cardsPage: DataForRequestCard[] | [] = [];
  const resultsFound = helpRequestsData?.length;

  if (helpRequestsData) {
    const pageSlice = helpRequestsData.slice(0, 3);
    cardsPage = transformDataForCardsView(pageSlice);
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Paper>
      <Box>
        <Stack padding="12px 36px 40px 36px" gap="20px">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Найдено: {error ? '0' : resultsFound}</Typography>
            <SetViewButtons />
          </Stack>
          <Results cardsPage={cardsPage} error={error} />
        </Stack>
      </Box>
    </Paper>
  );
};
