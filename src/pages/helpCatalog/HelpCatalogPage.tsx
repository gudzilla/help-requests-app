import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Filters } from './components/filters/Filters';
import { Results } from './components/results/Results';
import { HelpCatalogSearch } from './HelpCatalogSearch';
import { useGetFavouritesQuery } from '@/lib/api/api';
import { MainContentStack } from '@/components/MainContentStack';
import { theme } from '@/styles/theme';
import SortIcon from '@mui/icons-material/Sort';

const mainContentStyle = {
  flex: 1,
};

export const HelpCatalogPage = () => {
  // todo: что надо с этим сделать?
  useGetFavouritesQuery();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <MainContentStack>
      <Typography component="h1" variant="h4" paddingLeft={{ xs: '16px', md: 0 }}>
        Запросы о помощи
      </Typography>
      <Stack direction={{ sx: 'column', lg: 'row' }} gap={{ xs: '10px', md: '20px' }}>
        {isLargeScreen && <Filters />}
        <Stack
          direction={{ md: 'column' }}
          gap={{ xs: '10px', md: '20px' }}
          sx={mainContentStyle}
        >
          <Stack direction="row">
            <HelpCatalogSearch />
          </Stack>
          <Results />
        </Stack>
      </Stack>
    </MainContentStack>
  );
};
