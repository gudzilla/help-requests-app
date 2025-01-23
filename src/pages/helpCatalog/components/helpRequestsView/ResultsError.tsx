import { Typography } from '@mui/material';
import ErrorIcon from '@/assets/load-error.svg?react';

export const ResultsError = () => {
  return (
    <>
      <ErrorIcon style={{ marginBottom: '24px' }} />
      <Typography color="error" variant="h5">
        Ошибка! Не удалось загрузить информацию
      </Typography>
    </>
  );
};
