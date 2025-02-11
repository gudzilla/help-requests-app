import { Card, CardActions, CardHeader, Stack, Typography } from '@mui/material';
import { HelpRequestData } from '@/lib/api/types';
import { LoadingButton } from '@mui/lab';
import { useContributionMutation } from '@/lib/api/api';
import { debounce } from 'lodash';
import { SmallCardContent } from './SmallCardContent';

const styles = {
  card: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    padding: '20px',
    paddingBottom: '30px',
    border: 1,
    borderColor: 'divider',
  },
};

type SmallCardProps = {
  data: HelpRequestData;
};

export const SmallCard = ({ data }: SmallCardProps) => {
  const {
    id,
    title,
    goalDescription,
    endingDate,
    requestGoalCurrentValue,
    requestGoal,
    contributorsCount,
  } = data;

  const [contribution, { isLoading }] = useContributionMutation();

  const handleHelpButtonClick = debounce(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      await contribution(id);
    },
    200
  );

  return (
    <Card elevation={0} sx={styles.card}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{ padding: 0, marginBottom: '10px' }}
      />
      <SmallCardContent
        goalDescription={goalDescription}
        endingDate={endingDate}
        requestGoalCurrentValue={requestGoalCurrentValue}
        requestGoal={requestGoal}
      />
      <CardActions sx={{ display: 'block', padding: 0 }}>
        <Stack gap="4px">
          <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
            {contributorsCount === 0
              ? 'Вы будете первым'
              : `Нас уже: ${contributorsCount}`}
          </Typography>
          <LoadingButton
            variant="contained"
            onClick={handleHelpButtonClick}
            size="large"
            loading={isLoading}
          >
            ПОМОЧЬ
          </LoadingButton>
        </Stack>
      </CardActions>
    </Card>
  );
};
