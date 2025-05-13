import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { useScreenSize } from '@/lib/useScreenSize';

type RequestsPaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: (v: number) => void;
};

export function RequestsPagination(props: RequestsPaginationProps) {
  const { totalPages, currentPage, setPage } = props;
  const { isScreenXs } = useScreenSize();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        siblingCount={isScreenXs ? 0 : 1}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
}
