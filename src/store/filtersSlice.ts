import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HelpRequestData } from '../lib/api/types';

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

type HelperType = HelpRequestData['helperRequirements'];

type HelpRequestFiltersType = {
  requesterType: HelpRequestData['requesterType'] | null;
  helpType: HelpRequestData['helpType'] | null;
  helperRequirements: {
    helperType: HelperType['helperType'] | null;
    isOnline: boolean | null;
    qualification: HelperType['qualification'] | null;
  };
  searchQuery: string;
};

const initialState: HelpRequestFiltersType = {
  requesterType: null,
  helpType: null,
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
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = filtersSlice.actions;
export default filtersSlice.reducer;
