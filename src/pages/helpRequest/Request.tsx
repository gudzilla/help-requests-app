import { useParams } from 'react-router-dom';
import { PARSING_ERROR, ServerError, useGetRequestByIdQuery } from '@/lib/api/api';
import { Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';
import { RequestInfo } from './requestInfo/RequestInfo';
import { SmallCard } from './smallCard/SmallCard';

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
    console.error(error);
    const errorCode =
      (error as PARSING_ERROR).originalStatus || (error as ServerError).status || false;
    const error500 = errorCode === 500;
    const error404 = errorCode === 404;
    return (
      <Paper elevation={0} sx={styles.loadingAndError}>
        <Stack gap={'24px'}>
          <ErrorIcon style={{ alignSelf: 'center' }} />
          <Typography color="error" variant="h5" sx={{ whiteSpace: 'pre-line' }}>
            {error404
              ? `Ошибка 404. \n Запроса по этому адресу не существует`
              : 'Ошибка! Не удалось загрузить информацию'}
          </Typography>
          {error500 && (
            <Button variant="outlined" onClick={handleRefetchRequest}>
              Повторить запрос
            </Button>
          )}
        </Stack>
      </Paper>
    );
  }

  if (data) {
    return (
      <Stack direction="row" spacing={'20px'}>
        <RequestInfo request={data} />
        <SmallCard data={data} />
      </Stack>
    );
  }
};
