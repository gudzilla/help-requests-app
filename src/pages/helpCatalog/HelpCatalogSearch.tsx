import {
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setSearchQuery } from './state/filtersSlice';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFiltersStateSelector } from './state/selectors';
import { ModalFilters } from './components/filters/ModalFilters';
import { useScreenSize } from '@/lib/useScreenSize';

const styles = {
  search: {
    gap: { xs: '8px', lg: '12px' },
    flex: 1,
  },
};

export const HelpCatalogSearch = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useFiltersStateSelector();
  const [searchInput, setSearchInput] = useState(searchQuery);

  const { isScreenLgDown } = useScreenSize();

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
    <Paper sx={{ flex: 1 }}>
      <Stack direction="row" gap="14px" padding={{ xs: '10px 16px', lg: '16px 32px' }}>
        {isScreenLgDown && <ModalFilters />}
        <Stack direction="row" sx={styles.search} alignItems="center">
          <InputLabel htmlFor="input-search">
            <Typography component="label" variant="h6" color="textPrimary">
              Поиск
            </Typography>
          </InputLabel>
          <TextField
            value={searchInput}
            id="input-search"
            type="search"
            variant="standard"
            placeholder="Введите название задачи или организации"
            onChange={handleInputChange}
            sx={{ flex: 1 }}
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
      </Stack>
    </Paper>
  );
};
