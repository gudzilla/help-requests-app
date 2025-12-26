import { Box, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { HelpRequest } from '@/lib/api/types';
import { TextInfoHeader } from '@/components';

const style = {
  icon: {
    inProgress: {
      color: 'action.disabled',
      marginRight: '4px',
    },
    completed: { color: 'success.light', marginRight: '4px' },
  },
};

type ActionsScheduleProps = {
  actions: HelpRequest['actionsSchedule'];
};

export const ActionsSchedule = (props: ActionsScheduleProps) => {
  const { actions } = props;
  return (
    <Box>
      <TextInfoHeader text="План действий" />
      <Stack gap="8px">
        {actions.map((step, index) => (
          <Box key={index} sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <CheckCircleOutlineIcon
              sx={step.isDone ? style.icon.completed : style.icon.inProgress}
            />
            <Typography>{step.stepLabel}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
