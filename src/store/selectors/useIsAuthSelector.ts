import { useAppSelector } from '@/lib/redux/hooks';

const isAuthSelector = (state: RootState) => state.auth;

export const useIsAuthSelector = () => useAppSelector(isAuthSelector);
