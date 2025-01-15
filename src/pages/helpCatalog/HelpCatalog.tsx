import { Box } from '@mui/material';
import { RequestCards } from './components/RequestCards';

export const HelpCatalog = () => {
  return (
    <Box sx={{ height: '60vh', display: 'grid', placeItems: 'center' }}>
      <h2>Каталог Помощи</h2>
      <RequestCards />
    </Box>
  );
};
