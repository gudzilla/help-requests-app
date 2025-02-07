import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { FilterWhom } from './FilterWhom';
import { FilterHow } from './FilterHow';
import { FiltersVolunteer } from './filtersVolunteer/FiltersVolunteer';

const filtersSectionStyle = {
  width: '320px',
  padding: '20px',
};

export const Filters = () => {
  return (
    <Paper sx={{ alignSelf: 'flex-start' }}>
      <Stack spacing={'20px'} sx={filtersSectionStyle}>
        <Box>
          <Typography variant="h6">Фильтрация</Typography>
          <Divider />
        </Box>
        <FilterWhom />
        <FilterHow />
        <FiltersVolunteer />
      </Stack>
    </Paper>
  );
};
