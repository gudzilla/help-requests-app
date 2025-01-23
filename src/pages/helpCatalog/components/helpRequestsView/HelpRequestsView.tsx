import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataForRequestCard } from './RequestCard';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from './transformToRequestCardProps';
import { Results } from './Results';
import { SetViewButtons } from './SetViewButtons';
import { PaginationView } from './PaginationView';
import React from 'react';
import { usePagination } from '@/lib/usePagination';

const ITEMS_PER_PAGE = 3;

export const HelpRequestsView = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: helpRequestsData, isLoading, error } = useGetRequestsQuery();
  const resultsFound = helpRequestsData?.length;
  let itemsReadyForRender: DataForRequestCard[] | [] = [];
  let totalPages = 0;

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  if (helpRequestsData) {
    const { currentItems, totalPages: total } = usePagination(
      helpRequestsData,
      ITEMS_PER_PAGE,
      currentPage
    );
    itemsReadyForRender = transformDataForCardsView(currentItems);
    totalPages = total;
  }

  return (
    <Paper>
      <Box>
        <Stack padding="12px 36px 40px 36px" gap="20px">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Найдено: {error ? '0' : resultsFound}</Typography>
            <SetViewButtons />
          </Stack>
          <Results cards={itemsReadyForRender} error={error} isLoading={isLoading} />
          {helpRequestsData && (
            <PaginationView
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </Paper>
  );
};
