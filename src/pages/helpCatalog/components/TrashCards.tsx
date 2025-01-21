import { Box, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { HelpRequestData } from '@/lib/api/types';
import { useGetRequestsQuery } from '@/lib/api/api';

export const TrashCards = () => {
  const { data, isLoading, error } = useGetRequestsQuery();
  // const memoizedHelpRequests = useMemo(() => data, [data]);
  let helpRequestsSlice: HelpRequestData[] = [];
  if (data) {
    helpRequestsSlice = data.slice(0, 5);
    console.log(helpRequestsSlice);

    // TODO DELETE
    for (let help of helpRequestsSlice) {
      console.log('Location = ', help.location);
    }
  }

  const dataSliceMinimized = helpRequestsSlice.map((item) => ({
    title: item.title,
    id: item.id,
  }));

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <Typography mb={2}>Ошибка Сервера. Попробуйте снова</Typography>
        <ErrorIcon />
      </Box>
    );
  }

  return (
    <Box>
      {dataSliceMinimized.map((item, index) => {
        return (
          <Typography
            variant="h6"
            key={index}
            sx={{
              'cursor': 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {item.title}
          </Typography>
        );
      })}
    </Box>
  );
};
