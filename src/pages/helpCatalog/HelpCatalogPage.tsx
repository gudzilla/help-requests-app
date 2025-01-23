import { Stack, Typography } from '@mui/material';
import { Filters } from './components/filters/Filters';
import { useGetFavoritesQuery } from '../../lib/api/api';
import { HelpRequestsView } from './components/helpRequestsView/HelpRequestsView';
import { SearchBar } from './components/search/SearchBar';

const mainContentStyle = {
  flex: 1,
};

export const HelpCatalogPage = () => {
  const { data: favoritesList } = useGetFavoritesQuery();
  if (favoritesList) {
    console.log('favoritesList = ', favoritesList);
    console.log('favoritesList.favoriteRequests = ', favoritesList?.favoriteRequests);
  }

  return (
    <Stack padding="30px 40px" direction="column" spacing={2}>
      <Typography component="h1" variant="h4">
        Запросы о помощи
      </Typography>
      <Stack direction="row" spacing={'20px'}>
        <Filters />
        <Stack direction="column" spacing={'20px'} sx={mainContentStyle}>
          <SearchBar />
          <HelpRequestsView />
        </Stack>
      </Stack>
    </Stack>
  );
};
