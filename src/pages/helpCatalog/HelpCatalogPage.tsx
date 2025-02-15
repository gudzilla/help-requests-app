import { Stack, Typography } from '@mui/material';
import { Filters } from './components/filters/Filters';
import { Results } from './components/results/Results';
import { HelpCatalogSearch } from './HelpCatalogSearch';
import { useGetFavouritesQuery } from '@/lib/api/api';

const mainContentStyle = {
  flex: 1,
};

export const HelpCatalogPage = () => {
  useGetFavouritesQuery();

  return (
    <Stack padding={{ xs: '10px 12px', lg: '30px 40px' }} spacing={2}>
      <Typography component="h1" variant="h4">
        Запросы о помощи
      </Typography>
      <Stack direction={{ sx: 'column', md: 'row' }} gap={'20px'}>
        <Filters />
        <Stack direction="column" spacing={'20px'} sx={mainContentStyle}>
          <HelpCatalogSearch />
          <Results />
        </Stack>
      </Stack>
    </Stack>
  );
};
