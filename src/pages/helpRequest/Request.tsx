import { useParams } from 'react-router-dom';
import { useGetRequestByIdQuery } from '@/lib/api/api';
import { Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { RequestInfo } from './requestInfo/RequestInfo';

const styles = {
  loadingAndError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '80vh',
    border: 1,
    borderColor: 'divider',
  },
};

export const Request = () => {
  const { requestId } = useParams();
  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch: refetchRequest,
  } = useGetRequestByIdQuery(requestId ?? '');

  const handleRefetchRequest = () => {
    refetchRequest();
  };

  if (isLoading || isFetching) {
    return (
      <Paper elevation={0} sx={styles.loadingAndError}>
        <Stack gap={'24px'}>
          <CircularProgress size="5rem" />
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={0} sx={styles.loadingAndError}>
        <Stack gap={'24px'}>
          <ErrorIcon style={{ alignSelf: 'center' }} />
          <Typography color="error" variant="h5">
            Ошибка! Не удалось загрузить информацию
          </Typography>
          <Button variant="outlined" onClick={handleRefetchRequest}>
            Повторить запрос
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack direction="row" spacing={'20px'}>
      {data && <RequestInfo request={data} />}
      <Paper sx={{ width: '320px', padding: '30px', textAlign: 'center' }}>
        Маленькая карточка
      </Paper>
    </Stack>
  );
};
