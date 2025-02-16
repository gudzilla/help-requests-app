import { Stack, Paper, CircularProgress, Button, Typography } from '@mui/material';
import { useGetUserQuery, PARSING_ERROR, ServerError } from '../../lib/api/api';
import { ProfileCard } from './ProfileCard';
import ErrorIcon from '@/assets/load-error.svg?react';
import { ProfileInfo } from './profileInfo/ProfileInfo';

const styles = {
  loadingAndError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '80vh',
  },
};

export const ProfilePageContent = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetUserQuery();

  const handleRefetchUser = () => {
    refetch();
  };

  if (isLoading || isFetching) {
    return (
      <Paper variant="outlined" sx={styles.loadingAndError}>
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
      <Paper variant="outlined" sx={styles.loadingAndError}>
        <Stack gap={'24px'}>
          <ErrorIcon style={{ alignSelf: 'center' }} />
          <Typography color="error" variant="h5" sx={{ whiteSpace: 'pre-line' }}>
            {error404
              ? `Ошибка 404. \n Запроса по этому адресу не существует`
              : 'Ошибка! Не удалось загрузить информацию о профиле'}
          </Typography>
          {error500 && (
            <Button variant="outlined" onClick={handleRefetchUser}>
              Повторить запрос
            </Button>
          )}
        </Stack>
      </Paper>
    );
  }

  if (data) {
    const { name, lastName, status } = data;
    return (
      <Stack direction="row" spacing={'20px'}>
        <ProfileCard name={name} lastName={lastName} status={status} />
        <ProfileInfo data={data} />
      </Stack>
    );
  }
};
