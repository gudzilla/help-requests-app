import { useAppSelector } from '@/lib/redux/hooks';
import { createSelector } from '@reduxjs/toolkit';
import { HelpRequestData } from '../../../../lib/api/types';
import { HelperRequirementsFilterType, HelpRequestFiltersType } from '../filtersSlice';

// todo: ВОПРОС - || [] верно или лучше по другому ?
const requestsDataSelector = (state: RootState) =>
  // ЧТО ЗА НАФИГ с (undefined)
  state.helpEldersApi.queries['getRequests(undefined)']?.data as HelpRequestData[];
// state.helpEldersApi.queries.getRequests?.data ;
const filtersSelector = (state: RootState) => state.filters;

const filterByType =
  (helpType: HelpRequestFiltersType['helpType']) => (data: HelpRequestData) =>
    helpType === null ? true : data.helpType === helpType;

const filterByRequester =
  (requesterType: HelpRequestFiltersType['requesterType']) => (data: HelpRequestData) =>
    requesterType === null ? true : requesterType === data.requesterType;

const filterByQualification =
  (qualification: HelperRequirementsFilterType['qualification']) =>
  (data: HelpRequestData) =>
    qualification === null
      ? true
      : qualification === data.helperRequirements.qualification;

const applyFilters = (data: HelpRequestData[], filters: HelpRequestFiltersType) => {
  const filterFunctions = [
    filterByType(filters.helpType),
    filterByRequester(filters.requesterType),
    filterByQualification(filters.helperRequirements.qualification),
  ];

  return data.filter((requestData) =>
    filterFunctions.every((FilterFn) => {
      return FilterFn(requestData);
    })
  );
};

const filteredDataSelector = createSelector(
  [requestsDataSelector, filtersSelector],
  (data, filters) => {
    console.log('filteredDataSelector');

    if (!data) {
      return null;
    }
    let filteredData = data;
    console.log('INSIDE FILTERS');
    filteredData = applyFilters(data, filters);

    return filteredData;
  }
);
export const useFilteredDataSelector = () => useAppSelector(filteredDataSelector);

// ----------------- OTHER WAY TO ACCESS DATA IN getRequests
// const requestsData = (state: RootState) =>
//   state.helpEldersApi.queries['getRequests']?.data ?? [];
// state.helpEldersApi.queries.getRequests?.data || [];
