import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { FilterWhomWeHelp } from './FilterWhomWeHelp';
import { FilterHowWeHelp } from './FilterHowWeHelp';
import { FiltersVolunteer } from './filtersVolunteer/FiltersVolunteer';
import { FilterDate } from './FilterDate';
import { useAppDispatch } from '@/lib/redux/hooks';
import { initialFiltersState, removeAllFilters } from '../../state/filtersSlice';
import { useFiltersStateSelector } from '../../state/selectors';
import { areObjectsDeepEqual } from '@/lib/areObjectsDeepEqual';

const styles = {
  paper: {
    alignSelf: { lg: 'flex-start' },
  },
  stack: {
    padding: { xs: '20px 16px', md: '20px' },
  },
};

type FiltersProps = { sx?: SxProps<Theme> };

export const Filters = ({ sx }: FiltersProps) => {
  const dispatch = useAppDispatch();
  const filtersState = useFiltersStateSelector();
  const hasNoFilters = areObjectsDeepEqual(filtersState, initialFiltersState);

  const handleClearFiltersButton = () => {
    dispatch(removeAllFilters());
  };
  return (
    <Paper sx={{ ...styles.paper, ...sx }}>
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
