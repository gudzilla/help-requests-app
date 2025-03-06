import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HelperRequirementsType, HelpRequestFiltersType } from './types';
import { HelpRequest } from '@/lib/api/types';

export const initialFiltersState: HelpRequestFiltersType = {
  helpType: [],
  requesterType: [],
  helperRequirements: {
    helperType: [],
    isOnlineArr: [],
    qualification: [],
  },
  helpDate: null,
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFiltersState,
  reducers: {
    addHelpType(state, action: PayloadAction<HelpRequest['helpType']>) {
      state.helpType.push(action.payload);
    },
    removeHelpType(state, action: PayloadAction<HelpRequest['helpType']>) {
      state.helpType = state.helpType.filter((type) => type !== action.payload);
    },
    addRequesterType(state, action: PayloadAction<HelpRequest['requesterType']>) {
      state.requesterType.push(action.payload);
    },
    removeRequesterType(state, action: PayloadAction<HelpRequest['requesterType']>) {
      state.requesterType = state.requesterType.filter((type) => type !== action.payload);
    },
    addVolunteerQualification(
      state,
      action: PayloadAction<HelperRequirementsType['qualification']>
    ) {
      state.helperRequirements.qualification.push(action.payload);
    },
    removeVolunteerQualification(
      state,
      action: PayloadAction<HelperRequirementsType['qualification']>
    ) {
      state.helperRequirements.qualification =
        state.helperRequirements.qualification.filter(
          (qualification) => qualification !== action.payload
        );
    },
    addVolunteerFormat(state, action: PayloadAction<HelperRequirementsType['isOnline']>) {
      state.helperRequirements.isOnlineArr.push(action.payload);
    },
    removeVolunteerFormat(
      state,
      action: PayloadAction<HelperRequirementsType['isOnline']>
    ) {
      state.helperRequirements.isOnlineArr = state.helperRequirements.isOnlineArr.filter(
        (booleanItem) => booleanItem !== action.payload
      );
    },
    addVolunteersNeeded(
      state,
      action: PayloadAction<HelperRequirementsType['helperType']>
    ) {
      state.helperRequirements.helperType.push(action.payload);
    },
    removeVolunteersNeeded(
      state,
      action: PayloadAction<HelperRequirementsType['helperType']>
    ) {
      state.helperRequirements.helperType.push(action.payload);
      state.helperRequirements.helperType = state.helperRequirements.helperType.filter(
        (type) => type !== action.payload
      );
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
  addHelpType,
  removeHelpType,
  addRequesterType,
  removeRequesterType,
  addVolunteerQualification,
  removeVolunteerQualification,
  addVolunteerFormat,
  removeVolunteerFormat,
  addVolunteersNeeded,
  removeVolunteersNeeded,
  setFilterDate,
  setSearchQuery,
  removeAllFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
