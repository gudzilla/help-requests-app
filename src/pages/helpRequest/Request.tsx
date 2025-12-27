import { useParams } from 'react-router-dom';
import { PARSING_ERROR, ServerError, useGetRequestByIdQuery } from '@/lib/api/api';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { RequestInfo } from './requestInfo/RequestInfo';
import { SmallCard } from './smallCard/SmallCard';
import { StatusPaper } from '@/components/StatusPaper';
import { ResponsiveErrorIcon } from '@/components/ResponsiveErrorIcon';

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
      <StatusPaper>
        <Stack gap={'24px'}>
          <CircularProgress size="5rem" />
        </Stack>
      </StatusPaper>
    );
  }

  if (error) {
    const errorCode =
      (error as PARSING_ERROR).originalStatus || (error as ServerError).status || false;
    const error500 = errorCode === 500;
    const error404 = errorCode === 404;
    return (
      <StatusPaper>
        <Stack gap={{ xs: '16px', md: '24px' }} alignItems="center">
          <ResponsiveErrorIcon />
          <Typography
            color="error"
            variant="h5"
            textAlign="center"
            sx={{
              whiteSpace: 'pre-line',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            {error404
              ? `Ошибка 404. \n Запроса по этому адресу не существует`
              : 'Ошибка! Не удалось загрузить информацию о запросе'}
          </Typography>
          {error500 && (
            <Button variant="outlined" onClick={handleRefetchRequest}>
              Повторить запрос
            </Button>
          )}
        </Stack>
      </StatusPaper>
    );
  }

  if (data) {
    return (
      <Stack direction={{ xs: 'column-reverse', lg: 'row' }} spacing={'20px'}>
        <RequestInfo request={data} />
        <SmallCard data={data} />
      </Stack>
    );
  }
};
