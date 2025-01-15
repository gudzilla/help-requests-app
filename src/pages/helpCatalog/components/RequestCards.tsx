import { Box, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { errorHandler } from '@/lib/api/errorHandler';
import { HelpRequestData } from '@/lib/api/types';
import { useGetRequestsQuery } from '@/lib/api/api';
import { useEffect } from 'react';

export const RequestCards = () => {
  // const navigate = useNavigate();
  const { data, isLoading, error } = useGetRequestsQuery();
  // const memoizedHelpRequests = useMemo(() => data, [data]);

  let helpRequestsSlice: HelpRequestData[] = [];
  if (data) {
    helpRequestsSlice = data.slice(0, 10);
  }
  const dataSliceMinimized = helpRequestsSlice.map((item) => ({
    title: item.title,
    id: item.id,
  }));

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }
  }, [error]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    // console.log('Error: ', error);
    // todo: if NO TOKEN (expired) - need to log out and make state isAuth - false

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
            onClick={() => {
              // navigate(`/help-catalog/${item.id}`);
            }}
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
