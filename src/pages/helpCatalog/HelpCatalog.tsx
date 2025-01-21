import { Box, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Filters } from './components/filters/Filters';

const mainContentStyle = {
  flex: 1,
};

const resultsSectionStyle = {};

export const HelpCatalog = () => {
  return (
    <Stack padding="30px 40px" direction="column" spacing={2}>
      <Typography component="h1" variant="h4">
        Запросы о помощи
      </Typography>
      <Stack direction="row" spacing={'20px'}>
        <Filters />
        <Stack direction="column" spacing={'20px'} sx={mainContentStyle}>
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
          <Paper>
            <Box sx={resultsSectionStyle}>
              <Stack padding="12px 36px 40px 36px">
                <Typography variant="h6">Найдено: 33</Typography>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </Stack>
      {/* <RequestCards /> */}
    </Stack>
  );
};
