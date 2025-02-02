import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataForSingleCard } from './singleCard/types';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from './singleCard/transformToSingleCardProps';
import { HelpCards } from './HelpCards';
import { ResultsViewModeSwitcher } from './ResultsViewModeSwitcher';
import { ResultsPagination } from './ResultsPagination';
import React, { useEffect } from 'react';
import { usePagination } from '@/lib/usePagination';

const ITEMS_PER_PAGE = 3;

export const Results = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    data: helpRequestsData,
    isLoading: isLoadingQuery,
    error,
  } = useGetRequestsQuery();
  // Фейковый стейт чтобы удлинить отображение загрузки
  const [isFakeLoading, setIsFakeLoading] = React.useState(true);
  const isLoading = isLoadingQuery || isFakeLoading;
  const resultsFound = helpRequestsData?.length;
  let itemsReadyForRender: DataForSingleCard[] = [];
  let totalPages = 0;

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  // Удлиняю время отображения загрузки в UI через isFakeLoading с setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (helpRequestsData) {
    console.log('helpRequestsData = ', helpRequestsData.slice(0, 10));
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
            <ResultsViewModeSwitcher />
          </Stack>
          <HelpCards cards={itemsReadyForRender} error={error} isLoading={isLoading} />
          {helpRequestsData && (
            <ResultsPagination
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
