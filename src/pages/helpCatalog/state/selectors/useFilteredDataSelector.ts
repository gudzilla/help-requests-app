import { useAppSelector } from '@/lib/redux/hooks';
import { createSelector } from '@reduxjs/toolkit';
import { HelpRequestData } from '../../../../lib/api/types';
import { HelperRequirementsFilterType, HelpRequestFiltersType } from '../filtersSlice';
import { isAfter, isValid, parseISO, startOfDay } from 'date-fns';

const isDate2LaterThanDate1 = (first: Date, second: string): boolean => {
  const date1 = new Date(first);
  const date2 = new Date(second);

  console.log('date1 as Date = ', date1);
  console.log('date2 as String = ', date2);

  const isDate2AfterDate1 =
    date2.getUTCFullYear() > date1.getUTCFullYear() ||
    (date2.getUTCFullYear() === date1.getUTCFullYear() &&
      date2.getUTCMonth() > date1.getUTCMonth()) ||
    (date2.getUTCFullYear() === date1.getUTCFullYear() &&
      date2.getUTCMonth() === date1.getUTCMonth() &&
      date2.getUTCDate() > date1.getUTCDate());

  return isDate2AfterDate1;
};

// const isDate2AfterDate1 = (date1: Date, date2: Date): boolean => {
//   return isAfter(startOfDay(parseISO(date2)), startOfDay(parseISO(date1)));
// };

const requestsDataSelector = (state: RootState) =>
  // ЧТО ЗА НАФИГ с (undefined)
  state.helpEldersApi.queries['getRequests(undefined)']?.data as HelpRequestData[];
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

const filterByFormat =
  (isOnline: HelperRequirementsFilterType['isOnline']) => (data: HelpRequestData) =>
    isOnline === null ? true : isOnline === data.helperRequirements.isOnline;

const filterByPeopleNeeded =
  (helperType: HelperRequirementsFilterType['helperType']) => (data: HelpRequestData) =>
    helperType === null ? true : helperType === data.helperRequirements.helperType;

const filterByDate =
  (helpDate: HelpRequestFiltersType['helpDate']) => (data: HelpRequestData) => {
    if (helpDate === null) {
      return true;
    }
    return isDate2LaterThanDate1(helpDate, data.endingDate);
  };

const applyFilters = (data: HelpRequestData[], filters: HelpRequestFiltersType) => {
  const filterFunctions = [
    filterByType(filters.helpType),
    filterByRequester(filters.requesterType),
    filterByQualification(filters.helperRequirements.qualification),
    filterByFormat(filters.helperRequirements.isOnline),
    filterByPeopleNeeded(filters.helperRequirements.helperType),
    filterByDate(filters.helpDate),
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
