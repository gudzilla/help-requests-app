import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useGetRequestsQuery } from '@/lib/api/api';
import { RequestCards } from './components/RequestCards';

export const HelpCatalog = () => {
  const { data: helpRequests = [], isLoading, error } = useGetRequestsQuery();
  const memoizedHelpRequests = useMemo(() => helpRequests, [helpRequests]);

  let helpRequestsSlice = [];
  if (memoizedHelpRequests) {
    helpRequestsSlice = memoizedHelpRequests.slice(0, 10);
  }
  const dataSliceMinimized = helpRequestsSlice.map((item) => ({
    title: item.title,
    id: item.id,
  }));

  return (
    <Box sx={{ height: '60vh', display: 'grid', placeItems: 'center' }}>
      <h2>Каталог Помощи</h2>
      <RequestCards error={error} data={dataSliceMinimized} isLoading={isLoading} />
    </Box>
  );
};
