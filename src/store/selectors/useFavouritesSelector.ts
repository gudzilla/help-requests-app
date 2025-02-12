import { useAppSelector } from '@/lib/redux/hooks';
import { FavoritesResponse } from '@/lib/api/api';

const favouritesSelector = (state: RootState) =>
  (state.helpEldersApi.queries['getFavourites(undefined)']?.data as FavoritesResponse) ??
  [];

export const useFavouritesSelector = () => useAppSelector(favouritesSelector);
