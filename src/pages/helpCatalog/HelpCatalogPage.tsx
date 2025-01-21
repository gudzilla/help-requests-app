import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Filters } from './components/filters/Filters';
import { TrashCards } from './components/TrashCards';
import { useGetFavoritesQuery } from '../../lib/api/api';
import { HelpRequestsView } from './components/helpRequestsView/HelpRequestsView';

const mainContentStyle = {
  flex: 1,
};

export const HelpCatalogPage = () => {
  const { data: favoritesList } = useGetFavoritesQuery();
  if (favoritesList) {
    console.log('favoritesList = ', favoritesList);
    console.log('favoritesList.favoriteRequests = ', favoritesList?.favoriteRequests);
  }

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
          <HelpRequestsView />
        </Stack>
      </Stack>
    </Stack>
  );
};
