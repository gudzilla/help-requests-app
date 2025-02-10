import { useAppSelector } from '@/lib/redux/hooks';

const filterDateSelector = (state: RootState) => {
  const { helpDate } = state.filters;
  return helpDate !== null ? new Date(helpDate) : null;
};

export const useFilterDateSelector = () => useAppSelector(filterDateSelector);
