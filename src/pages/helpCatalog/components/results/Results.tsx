import { Box, Paper, Stack, Typography } from '@mui/material';
import { useGetRequestsQuery } from '@/lib/api/api';
import { transformDataForCardsView } from './singleCard/transformToSingleCardProps';
import { HelpCards } from './HelpCards';
import { ResultsViewModeSwitcher } from './ResultsViewModeSwitcher';
import { ResultsPagination } from './ResultsPagination';
import React, { useEffect } from 'react';
import { usePagination } from '@/lib/usePagination';
import { useFilteredDataSelector, useFiltersStateSelector } from '../../state/selectors';

export const Results = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    isLoading: isLoadingRequests,
    error,
    isFetching: isFetchingRequests,
    refetch: refetchRequests,
  } = useGetRequestsQuery();
  const filters = useFiltersStateSelector();

  // Cтейт чтобы удлинить отображение загрузки
  const [isFakeLoading, setIsFakeLoading] = React.useState(true);

  const isLoading = isLoadingRequests || isFakeLoading || isFetchingRequests;
  const noErrorOrLoading = !(error || isLoading);

  // ФИЛЬТРОВАННЫЕ ДАННЫЕ
  const filteredData = useFilteredDataSelector();
  const resultsFound = filteredData.length;

  const hasNoResultsOnFilter = filteredData?.length === 0;
  const dataNotEmpty = !hasNoResultsOnFilter;
  const showPagination = filteredData && dataNotEmpty && !error && !isLoading;

  // ---------------------- PAGINATION -----------------
  const { currentItems, totalPages } = usePagination(filteredData, 3, currentPage);
  const itemsReadyForRender = transformDataForCardsView(currentItems);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleRefetchRequests = () => {
    refetchRequests();
  };

  // Удлиняю время отображения загрузки в UI через isFakeLoading с setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // ----------- ПЕРЕХОД НА 1-ю СТР ПРИ СМЕНЕ ФИЛЬТРОВ
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <Paper>
      <Box>
        <Stack padding="12px 36px 40px 36px" gap="20px">
          {noErrorOrLoading && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Найдено: {resultsFound}</Typography>
              <ResultsViewModeSwitcher />
            </Stack>
          )}
          <HelpCards
            cards={itemsReadyForRender}
            error={error}
            isLoading={isLoading}
            noResults={hasNoResultsOnFilter}
            refetchRequests={handleRefetchRequests}
          />
          {showPagination && (
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
