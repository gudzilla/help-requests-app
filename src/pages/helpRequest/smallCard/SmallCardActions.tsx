import { LoadingButton } from '@mui/lab';
import { CardActions, Stack, Typography } from '@mui/material';
import { HelpRequestData } from '@/lib/api/types';
import { DebouncedFunc } from 'lodash';
import { MouseEvent } from 'react';

type SmallCardActionsType = {
  contributorsCount: HelpRequestData['contributorsCount'];
  onClick: DebouncedFunc<(event: MouseEvent<HTMLButtonElement>) => Promise<void>>;
  isLoading: boolean;
};

export const SmallCardActions = (props: SmallCardActionsType) => {
  const { contributorsCount, onClick, isLoading } = props;

  return (
    <CardActions sx={{ display: 'block', padding: 0 }}>
      <Stack gap="4px">
        <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
          {contributorsCount === 0 ? 'Вы будете первым' : `Нас уже: ${contributorsCount}`}
        </Typography>
        <LoadingButton
          variant="contained"
          onClick={onClick}
          size="large"
          loading={isLoading}
        >
          ПОМОЧЬ
        </LoadingButton>
      </Stack>
    </CardActions>
  );
};
