import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataForRequestCard } from './ui/results/RequestCard';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from './transformToRequestCardProps';
import { Results } from './ui/results/Results';
import { ViewModeSwitcher } from './ViewModeSwitcher';
import { PaginationView } from './ui/paginationView/PaginationView';
import React, { useEffect } from 'react';
import { usePagination } from '@/lib/usePagination';

const ITEMS_PER_PAGE = 3;

export const HelpRequestsView = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    data: helpRequestsData,
    isLoading: isLoadingQuery,
    error,
  } = useGetRequestsQuery();
  // Фейковый стейт для отображения загрузки
  const [isFakeLoading, setIsFakeLoading] = React.useState(true);
  const isLoading = isLoadingQuery || isFakeLoading;
  const resultsFound = helpRequestsData?.length;
  let itemsReadyForRender: DataForRequestCard[] | [] = [];
  let totalPages = 0;

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  // Удлиняю время отображения загрузки в UI через isFakeLoading с setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

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
            <Typography variant="h6">
              Найдено: {error || isLoading ? '0' : resultsFound}
            </Typography>
            <ViewModeSwitcher />
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
