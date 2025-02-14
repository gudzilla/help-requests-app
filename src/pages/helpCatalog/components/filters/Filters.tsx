import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { FilterWhomWeHelp } from './FilterWhomWeHelp';
import { FilterHowWeHelp } from './FilterHowWeHelp';
import { FiltersVolunteer } from './filtersVolunteer/FiltersVolunteer';
import { FilterDate } from './FilterDate';
import { useAppDispatch } from '@/lib/redux/hooks';
import { initialFiltersState, removeAllFilters } from '../../state/filtersSlice';
import { useFiltersStateSelector } from '../../state/selectors';
import { areObjectsDeepEqual } from '@/lib/areObjectsDeepEqual';

const filtersSectionStyle = {
  width: { md: '320px' },
  padding: '20px',
};

export const Filters = () => {
  const dispatch = useAppDispatch();
  const filtersState = useFiltersStateSelector();
  const hasNoFilters = areObjectsDeepEqual(filtersState, initialFiltersState);

  const handleClearFiltersButton = () => {
    dispatch(removeAllFilters());
  };
  return (
    <Paper sx={{ alignSelf: { md: 'flex-start' } }}>
      <Stack spacing={'20px'} sx={filtersSectionStyle}>
        <Box>
          <Typography variant="h6">Фильтрация</Typography>
          <Divider />
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
          <FilterWhomWeHelp />
          <FilterHowWeHelp />
        </Stack>
        <FiltersVolunteer />
        <FilterDate />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleClearFiltersButton}
          disabled={hasNoFilters}
        >
          СБРОСИТЬ
        </Button>
      </Stack>
    </Paper>
  );
};
