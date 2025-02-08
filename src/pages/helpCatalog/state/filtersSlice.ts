import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HelpRequestData } from '@/lib/api/types';

export type HelperRequirementsType = HelpRequestData['helperRequirements'];

export type HelpRequestFiltersType = {
  helpType: HelpRequestData['helpType'] | null;
  requesterType: HelpRequestData['requesterType'] | null;
  helperRequirements: {
    helperType: HelperRequirementsType['helperType'] | null;
    isOnline: HelperRequirementsType['isOnline'] | null;
    qualification: HelperRequirementsType['qualification'] | null;
  };
  helpDate: Date | null;
  searchQuery: string;
};

export type HelperRequirementsFilterType = HelpRequestFiltersType['helperRequirements'];

const initialState: HelpRequestFiltersType = {
  helpType: null,
  requesterType: null,
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
  initialState,
  reducers: {
    setHelpType(state, action: PayloadAction<HelpRequestFiltersType['helpType']>) {
      state.helpType = action.payload;
    },
    setRequesterType(
      state,
      action: PayloadAction<HelpRequestFiltersType['requesterType']>
    ) {
      state.requesterType = action.payload;
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
    removeAllFilters() {
      return initialState;
    },
    // todo: вопрос - МОГУТ ЛИ БЫТЬ ОДИНАКОВЫЕ НАЗВАНИЯ ACTIONS в разных SLICES/Reducers ?
    // logout() {
    //   console.log('Второй LogOutFs');
    // },
  },
});

export const {
  setHelpType,
  setRequesterType,
  setVolunteerQualification,
  setVolunteerFormat,
  setVolunteersNeeded,
  setFilterDate,
  removeAllFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
