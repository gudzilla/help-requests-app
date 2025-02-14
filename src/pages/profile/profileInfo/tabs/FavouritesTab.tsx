import { TabPanel } from '@mui/lab';
import {
  FavoritesResponse,
  useGetFavouritesQuery,
  useGetRequestsQuery,
} from '@/lib/api/api';
import { HelpRequestData } from '@/lib/api/types';
import { Stack } from '@mui/material';
import { usePagination } from '@/lib/usePagination';
import { useState } from 'react';
import { transformDataForCardsView } from '@/components/helpCards/singleCard';
import { HelpCards, RequestsPagination } from '@/components';
import { safeScrollToTop } from '@/lib/safeScrollToTop';

export const FavouritesTab = () => {
  const [currentPage, setCurrentNumber] = useState(1);
  const handlePageChange = (value: number) => {
    setCurrentNumber(value);
    safeScrollToTop();
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
  const hasNoResults = favouriteRequests.length === 0;
  const showPagination = !isLoading && !getRequestsError && !hasNoResults;

  const { currentItems: requestsForPage, totalPages } = usePagination(
    favouriteRequests,
    6,
    currentPage
  );
  const cardsData = transformDataForCardsView(requestsForPage);

  return (
    <TabPanel value="user-favourites" sx={{ padding: 0 }}>
      <Stack gap={'20px'}>
        <HelpCards
          cards={cardsData}
          isLoading={isLoading}
          error={getRequestsError}
          hasNoResults={hasNoResults}
          refetchRequests={refetchRequests}
          messageForNoResults="У вас нету запросов в избранном"
        />
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
