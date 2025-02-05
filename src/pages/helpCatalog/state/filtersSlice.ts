import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HelpRequestData } from '@/lib/api/types';

// export type HelpRequestFiltersType = {
//   [K in keyof Pick<HelpRequestData, 'requesterType' | 'helpType'>]:
//     | HelpRequestData[K]
//     | null;
// } & {
//   helperRequirements: {
//     [P in keyof HelpRequestData['helperRequirements']]:
//       | HelpRequestData['helperRequirements'][P]
//       | null;
//   };
// };

type HelperRequirementsType = HelpRequestData['helperRequirements'];

export type HelpRequestFiltersType = {
  helpType: HelpRequestData['helpType'] | null;
  requesterType: HelpRequestData['requesterType'] | null;
  helperRequirements: {
    helperType: HelperRequirementsType['helperType'] | null;
    isOnline: boolean | null;
    qualification: HelperRequirementsType['qualification'] | null;
  };
  searchQuery: string;
};

const initialState: HelpRequestFiltersType = {
  helpType: null,
  requesterType: null,
  helperRequirements: {
    helperType: null,
    isOnline: null,
    qualification: null,
  },
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
    // todo: вопрос - МОГУТ ЛИ БЫТЬ ОДИНАКОВЫЕ НАЗВАНИЯ ACTIONS в разных SLICES/Reducers ?
    // logout() {
    //   console.log('Второй LogOutFs');
    // },
  },
});

export const { setHelpType, setRequesterType } = filtersSlice.actions;
export default filtersSlice.reducer;
