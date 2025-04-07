import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, useMediaQuery } from '@mui/material';
import { theme } from '../styles/theme';

type RequestsPaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: (v: number) => void;
};

export function RequestsPagination(props: RequestsPaginationProps) {
  const { totalPages, currentPage, setPage } = props;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        siblingCount={isSmallScreen ? 0 : 1}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
}
