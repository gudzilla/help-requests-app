import { InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setSearchQuery } from './state/filtersSlice';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFiltersStateSelector } from './state/selectors';

const stackStyle = {
  paddingLeft: { xs: '16px', md: '36px' },
  paddingRight: { xs: '16px', md: '36px' },
  paddingBlock: { xs: '20px', md: '20px 40px' },
  gap: { xs: '16px', md: '10px' },
};

export const HelpCatalogSearch = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useFiltersStateSelector();
  const [searchInput, setSearchInput] = useState(searchQuery);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((inputValue: string) => {
        dispatch(setSearchQuery(inputValue));
      }, 300),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    debouncedChangeHandler(value);
  };

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  return (
    <Paper>
      <Stack direction={{ xs: 'row', md: 'column' }} sx={stackStyle}>
        <Typography variant="h6">Поиск</Typography>
        <TextField
          value={searchInput}
          id="standard-search"
          type="search"
          variant="standard"
          placeholder="Введите название задачи или организации"
          onChange={handleInputChange}
          sx={{ flex: { xs: 1, md: 'unset' } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </Paper>
  );
};
