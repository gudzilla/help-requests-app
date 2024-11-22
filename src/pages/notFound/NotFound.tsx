import { Box } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';

export const NotFound = () => {
  return (
    <Box>
      <ErrorIcon />
      <h2>404 Error: Page Not Found</h2>
    </Box>
  );
};
