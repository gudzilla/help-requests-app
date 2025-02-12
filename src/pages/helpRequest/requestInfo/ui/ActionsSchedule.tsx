import { Box, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { theme } from '@/styles/theme';
import { HelpRequestData } from '@/lib/api/types';
import { TextInfoHeader } from '@/components/TextInfoHeader';

const style = {
  icon: {
    inProgress: {
      color: theme.palette.action.disabled,
      marginRight: '4px',
    },
    completed: { color: theme.palette.success.light, marginRight: '4px' },
  },
};

type ActionsScheduleProps = {
  actions: HelpRequestData['actionsSchedule'];
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
