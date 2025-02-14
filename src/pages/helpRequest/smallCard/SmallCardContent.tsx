import { CardContent, Box, Typography, Stack, LinearProgress } from '@mui/material';
import { HelpRequestData } from '@/lib/api/types';

type SmallCardContentProps = {
  goalDescription: HelpRequestData['goalDescription'];
  endingDate: HelpRequestData['endingDate'];
  requestGoalCurrentValue: HelpRequestData['requestGoalCurrentValue'];
  requestGoal: HelpRequestData['requestGoal'];
};

const styleCardContent = {
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '40px',
};

export const SmallCardContent = (props: SmallCardContentProps) => {
  const { goalDescription, endingDate, requestGoalCurrentValue, requestGoal } = props;
  const goalProgressInPercent = Math.floor((requestGoalCurrentValue / requestGoal) * 100);
  return (
    <CardContent sx={styleCardContent}>
      <Box>
        <Typography variant="subtitle2">Цель сбора</Typography>
        <Typography variant="body2">{goalDescription}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Завершение</Typography>
        <Typography variant="body2">
          {new Date(endingDate).toLocaleDateString('ru-RU')}
        </Typography>
      </Box>
      <Stack gap="4px">
        <Typography variant="subtitle2">Мы собрали</Typography>
        <LinearProgress
          variant="determinate"
          value={goalProgressInPercent}
          sx={{ borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {requestGoalCurrentValue} руб
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {requestGoal} руб
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  );
};
