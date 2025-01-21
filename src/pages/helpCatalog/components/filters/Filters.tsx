import React from 'react';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { FilterWhom } from './FilterWhom';
import { FilterHow } from './FilterHow';
import { FiltersType, FilterType } from './types';

const filtersSectionStyle = {
  width: '320px',
  padding: '20px',
};

export const Filters = () => {
  const [filters, setFilters] = React.useState<FiltersType>({
    whom: { pensioners: false, eldersHome: false },
    how: { items: false, finance: false },
  });

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterType: FilterType
  ) => {
    const { name, checked } = event.target;

    setFilters({
      ...filters,
      [filterType]: {
        ...filters[filterType],
        [name]: checked,
      },
    });
  };

  return (
    <Paper sx={{ alignSelf: 'flex-start' }}>
      <Stack spacing={'20px'} sx={filtersSectionStyle}>
        <Box>
          <Typography variant="h6">Фильтрация</Typography>
          <Divider />
        </Box>
        <FilterWhom state={filters.whom} onChange={handleFilterChange} />
        <FilterHow state={filters.how} onChange={handleFilterChange} />
      </Stack>
    </Paper>
  );
};
