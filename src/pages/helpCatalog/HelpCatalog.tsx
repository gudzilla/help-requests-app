import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useGetRequestsQuery } from '@/lib/api/rtkQuery';
import { RequestCards } from './RequestCards';

export const HelpCatalog = () => {
  const { data: helpRequests = [], isLoading, error } = useGetRequestsQuery();
  const memoizedHelpRequests = useMemo(() => helpRequests, [helpRequests]);

  let helpRequestsSlice = [];
  if (memoizedHelpRequests) {
    helpRequestsSlice = memoizedHelpRequests.slice(0, 10);
  }
  const dataSliceTitles = helpRequestsSlice.map((item) => item.title);

  return (
    <Box sx={{ height: '60vh', display: 'grid', placeItems: 'center' }}>
      <h2>Каталог Помощи</h2>
      <RequestCards error={error} data={dataSliceTitles} isLoading={isLoading} />
    </Box>
  );
};
