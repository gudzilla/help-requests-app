import { InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
  return (
    <Paper>
      <Stack direction="column" padding="20px 36px 40px 36px" spacing={'10px'}>
        <Typography variant="h6">Поиск</Typography>
        <TextField
          id="standard-search"
          type="search"
          variant="standard"
          placeholder="Введите название задачи или организации"
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
