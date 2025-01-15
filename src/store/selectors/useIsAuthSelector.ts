import { useAppSelector } from '@/lib/redux/hooks';

const isAuthSelector = (state: RootState) => state.isAuth;

export const useIsAuthSelector = () => useAppSelector(isAuthSelector);
