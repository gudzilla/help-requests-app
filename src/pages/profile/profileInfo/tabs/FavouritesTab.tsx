import { TabPanel } from '@mui/lab';
import {
  FavoritesResponse,
  useGetFavouritesQuery,
  useGetRequestsQuery,
} from '@/lib/api/api';
import { HelpRequestData } from '@/lib/api/types';
import { Box, CircularProgress, Stack, Typography, Button } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import NoResultsIcon from '@/assets/not-found-result.svg?react';
import { usePagination } from '@/lib/usePagination';
import { useState } from 'react';
import { transformDataForCardsView } from '@/components/helpCards/singleCard';
import { DataForSingleCard } from '@/components/helpCards/singleCard/types';
import { SingleCard } from '@/components/helpCards/singleCard/SingleCard';
import { RequestsPagination } from '@/components';

const StyleToStrechContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '64vh',
};

export const FavouritesTab = () => {
  const [currentPage, setCurrentNumber] = useState(1);
  const handlePageChange = (value: number) => {
    setCurrentNumber(value);
  };
  const {
    data: requestsArray,
    isLoading: isLoadingRequests,
    error: getRequestsError,
    isFetching: isFetchingRequests,
    refetch: refetchRequests,
  } = useGetRequestsQuery();
  const isLoading = isLoadingRequests || isFetchingRequests;

  const { data: favouritesIdsArray } = useGetFavouritesQuery();

  const getRequestsDataFromIds = (
    idsArray: FavoritesResponse | undefined,
    dataArray: HelpRequestData[] | undefined
  ) => {
    if (!idsArray || !dataArray) {
      return [];
    }
    const favIdsSet = new Set(idsArray);
    return dataArray.filter((request) => favIdsSet.has(request.id));
  };

  const favouriteRequests = getRequestsDataFromIds(favouritesIdsArray, requestsArray);
  const noResults = favouriteRequests.length === 0;
  const showPagination = !isLoading && !getRequestsError && !noResults;

  const { currentItems: requestsForPage, totalPages } = usePagination(
    favouriteRequests,
    3,
    currentPage
  );
  const cardsData = transformDataForCardsView(requestsForPage);

  if (isLoading) {
    return (
      <TabPanel value="user-favourites" sx={{ padding: 0 }}>
        <Box sx={StyleToStrechContainer}>
          <CircularProgress size="5rem" />
        </Box>
      </TabPanel>
    );
  }

  if (getRequestsError) {
    return (
      <TabPanel value="user-favourites" sx={{ padding: 0 }}>
        <Box sx={StyleToStrechContainer}>
          <Stack gap={'24px'}>
            <ErrorIcon style={{ alignSelf: 'center' }} />
            <Typography color="error" variant="h5">
              Ошибка! Не удалось загрузить избранное
            </Typography>
            <Button variant="outlined" onClick={refetchRequests}>
              Повторить запрос
            </Button>
          </Stack>
        </Box>
      </TabPanel>
    );
  }

  if (noResults) {
    return (
      <TabPanel value="user-favourites" sx={{ padding: 0 }}>
        <Box sx={StyleToStrechContainer}>
          <NoResultsIcon style={{ marginBottom: '24px' }} />
          <Typography variant="h5" paddingLeft={'62px'}>
            В избранном нет запросов
          </Typography>
        </Box>
      </TabPanel>
    );
  }

  return (
    <TabPanel value="user-favourites" sx={{ padding: 0 }}>
      <Stack gap={'20px'}>
        <Box sx={{ display: 'flex', gap: '24px', minHeight: '818px' }}>
          {cardsData.map((request: DataForSingleCard) => {
            return <SingleCard key={request.id} dataForRequestCard={request} />;
          })}
        </Box>
        {showPagination && (
          <RequestsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={handlePageChange}
          />
        )}
      </Stack>
    </TabPanel>
  );
};
