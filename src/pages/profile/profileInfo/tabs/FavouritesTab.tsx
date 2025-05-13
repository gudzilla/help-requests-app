import { TabPanel } from '@mui/lab';
import {
  FavoritesResponse,
  useGetFavouritesQuery,
  useGetRequestsQuery,
} from '@/lib/api/api';
import { HelpRequest } from '@/lib/api/types';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { HelpCards, RequestsPagination } from '@/components';
import { safeScrollToTop } from '@/lib/safeScrollToTop';
import { useHelpCardsPagination } from '@/components/helpCards';

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

  const getRequestsDataByIds = (
    idsArray: FavoritesResponse | undefined,
    dataArray: HelpRequest[] | undefined
  ) => {
    if (!idsArray || !dataArray) {
      return [];
    }
    const favIdsSet = new Set(idsArray);
    return dataArray.filter((request) => favIdsSet.has(request.id));
  };

  const favouriteRequests = getRequestsDataByIds(favouritesIdsArray, requestsArray);
  const isEmpty = favouriteRequests.length === 0;
  const notEmpty = favouriteRequests.length > 0;
  const showPagination = !isLoading && !getRequestsError && notEmpty;

  // ----------- PAGINATION ----------
  const ITEMS_PER_PAGE = 6;
  const { helpCardsData, totalPages } = useHelpCardsPagination({
    requestsArr: favouriteRequests,
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage: currentPage,
  });

  return (
    <TabPanel value="user-favourites" sx={{ padding: 0 }}>
      <Stack gap={'20px'}>
        <HelpCards
          cards={helpCardsData}
          isLoading={isLoading}
          error={getRequestsError}
          isEmpty={isEmpty}
          refetchRequests={refetchRequests}
          isEmptyMessage="У вас нету запросов в избранном"
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
