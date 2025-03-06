import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { FilterWhomWeHelp } from './FilterWhomWeHelp';
import { FilterHowWeHelp } from './FilterHowWeHelp';
import { FiltersVolunteer } from './filtersVolunteer/FiltersVolunteer';
import { FilterDate } from './FilterDate';
import { useAppDispatch } from '@/lib/redux/hooks';
import { initialFiltersState, removeAllFilters } from '../../state/filtersSlice';
import { useFiltersStateSelector } from '../../state/selectors';
import { areObjectsDeepEqual } from '@/lib/areObjectsDeepEqual';

type FiltersProps = { isModal?: boolean };

export const Filters = ({ isModal = false }: FiltersProps) => {
  const dispatch = useAppDispatch();
  const filtersState = useFiltersStateSelector();
  const hasNoFilters = areObjectsDeepEqual(filtersState, initialFiltersState);

  const styles = {
    paper: {
      regular: { alignSelf: { lg: 'flex-start' } },
      isModal: { boxShadow: 'none' },
    },
    stack: {
      padding: { xs: '20px 16px', md: '20px' },
    },
  };

  const handleClearFiltersButton = () => {
    dispatch(removeAllFilters());
  };
  return (
    <Paper sx={styles.paper[isModal ? 'isModal' : 'regular']}>
      <Stack spacing={'20px'} sx={styles.stack}>
        <Box>
          <Typography variant="h6">Фильтрация</Typography>
          <Divider />
        </Box>
        <Stack>
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
