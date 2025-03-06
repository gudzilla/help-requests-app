import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HelperRequirementsFilterType, HelpRequestFiltersType } from './types';
import { HelpRequest } from '@/lib/api/types';

export const initialFiltersState: HelpRequestFiltersType = {
  helpType: null,
  requesterType: [],
  helperRequirements: {
    helperType: null,
    isOnline: null,
    qualification: null,
  },
  helpDate: null,
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFiltersState,
  reducers: {
    setHelpType(state, action: PayloadAction<HelpRequestFiltersType['helpType']>) {
      state.helpType = action.payload;
    },
    addRequesterType(state, action: PayloadAction<HelpRequest['requesterType']>) {
      state.requesterType.push(action.payload);
    },
    removeRequesterType(state, action: PayloadAction<HelpRequest['requesterType']>) {
      state.requesterType = state.requesterType.filter((type) => type !== action.payload);
    },
    setVolunteerQualification(
      state,
      action: PayloadAction<HelperRequirementsFilterType['qualification']>
    ) {
      state.helperRequirements.qualification = action.payload;
    },
    setVolunteerFormat(
      state,
      action: PayloadAction<HelperRequirementsFilterType['isOnline']>
    ) {
      state.helperRequirements.isOnline = action.payload;
    },
    setVolunteersNeeded(
      state,
      action: PayloadAction<HelperRequirementsFilterType['helperType']>
    ) {
      state.helperRequirements.helperType = action.payload;
    },
    setFilterDate(state, action: PayloadAction<HelpRequestFiltersType['helpDate']>) {
      state.helpDate = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<HelpRequestFiltersType['searchQuery']>) {
      state.searchQuery = action.payload;
    },
    removeAllFilters() {
      return initialFiltersState;
    },
  },
});

export const {
  setHelpType,
  addRequesterType,
  removeRequesterType,
  setVolunteerQualification,
  setVolunteerFormat,
  setVolunteersNeeded,
  setFilterDate,
  setSearchQuery,
  removeAllFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
