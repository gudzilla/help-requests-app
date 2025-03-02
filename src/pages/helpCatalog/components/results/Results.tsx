import { Box, Paper, Stack, Typography } from '@mui/material';
import { useGetRequestsQuery } from '@/lib/api/api';
import { HelpCards } from '@/components';
import { RequestsPagination } from '@/components';
import React, { useEffect } from 'react';
import { useFilteredDataSelector, useFiltersStateSelector } from '../../state/selectors';
import { safeScrollToTop } from '@/lib/safeScrollToTop';
import { useHelpCardsPagination } from '@/components/helpCards';

const stackStyle = {
  paddingInline: { xs: '16px', md: '32px' },
  paddingBlock: '20px 40px',
  gap: '20px',
};

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
  const isReady = !(error || isLoading);

  // ОТФИЛЬТРОВАННЫЙ СПИСОК ЗАПРОСОВ
  const filteredRequests = useFilteredDataSelector();
  const resultsFound = filteredRequests.length;

  const noResults = filteredRequests?.length === 0;
  // const dataNotEmpty = filteredRequests?.length > 0;
  const showPagination = !noResults && !error && !isLoading;

  // ----------- PAGINATION ----------
  const { helpCardsData, totalPages } = useHelpCardsPagination(
    filteredRequests,
    6,
    currentPage
  );

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    safeScrollToTop();
  };

  const handleRefetchRequests = () => {
    refetchRequests();
  };

  // Удлиняю время отображения загрузки в UI через isFakeLoading с setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFakeLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // ----------- ПЕРЕХОД НА 1-ю СТР ПРИ СМЕНЕ ФИЛЬТРОВ
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <Paper>
      <Box>
        <Stack sx={stackStyle}>
          {isReady && <Typography variant="h6">Найдено: {resultsFound}</Typography>}
          <HelpCards
            cards={helpCardsData}
            error={error}
            isLoading={isLoading}
            isEmpty={noResults}
            refetchRequests={handleRefetchRequests}
          />
          {showPagination && (
            <RequestsPagination
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
