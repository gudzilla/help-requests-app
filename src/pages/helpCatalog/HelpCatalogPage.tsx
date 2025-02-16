import { Stack, Typography } from '@mui/material';
import { Filters } from './components/filters/Filters';
import { Results } from './components/results/Results';
import { HelpCatalogSearch } from './HelpCatalogSearch';
import { useGetFavouritesQuery } from '@/lib/api/api';
import { MainContentStack } from '../../components/MainContentStack';

const mainContentStyle = {
  flex: 1,
};

export const HelpCatalogPage = () => {
  useGetFavouritesQuery();

  return (
    <MainContentStack>
      <Typography component="h1" variant="h4" paddingLeft={{ xs: '16px', md: 0 }}>
        Запросы о помощи
      </Typography>
      <Stack direction={{ sx: 'column', lg: 'row' }} gap={{ xs: '10px', md: '20px' }}>
        <Filters />
        <Stack
          direction={{ md: 'column' }}
          gap={{ xs: '10px', md: '20px' }}
          sx={mainContentStyle}
        >
          <HelpCatalogSearch />
          <Results />
        </Stack>
      </Stack>
    </MainContentStack>
  );
};
