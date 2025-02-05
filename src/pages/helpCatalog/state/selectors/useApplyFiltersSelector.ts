import { useAppSelector } from '@/lib/redux/hooks';
import { createSelector } from '@reduxjs/toolkit';

const filtersState = (state: RootState) => state.filters;
const requestsData = (state: RootState) => state.helpEldersApi.queries.getRequests?.data;

const filteredDataSelector = createSelector(
  [filtersState, requestsData],
  (filtersState, data) => {
    console.log('getMemoizedFilteredData');
    console.log('DATA = ', data);
  }
);
export const useFilteredDataSelector = () => useAppSelector(filteredDataSelector);
