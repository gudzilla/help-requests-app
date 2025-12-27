import { Box, Paper, Stack, Typography } from '@mui/material';
import { HelpRequest } from '@/lib/api/types';
import { TextInfoHeader } from '@/components';
import { FavouriteButton } from './ui/FavouriteButton';
import { ActionsSchedule } from './ui/ActionsSchedule';
import { LocationInfo } from './ui/LocationInfo';
import { ContactsInfo } from './ui/ContactsInfo';
import { OrganizationInfo } from './ui/OrganizationInfo';

const stylePaper = {
  padding: { xs: '20px 16px', md: '40px 36px' },
  flex: 1,
};

type RequestInfoProps = {
  request: HelpRequest;
};

export const RequestInfo = ({ request }: RequestInfoProps) => {
  const {
    title,
    organization,
    id,
    description,
    goalDescription,
    endingDate,
    helperRequirements: { isOnline },
    contacts,
    location,
    actionsSchedule,
  } = request;

  return (
    <Paper sx={stylePaper} variant="outlined">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" gap={'30px'} sx={{ maxWidth: '550px' }}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <OrganizationInfo organization={organization} />
          <Box>
            <TextInfoHeader text="Кому мы помогаем" />
            <Typography>{description}</Typography>
          </Box>
          <Box>
            <TextInfoHeader text="Цель сбора" />
            <Typography>{goalDescription}</Typography>
          </Box>
          <ActionsSchedule actions={actionsSchedule} />
          <Box>
            <TextInfoHeader text="Завершение" />
            <Typography>{new Date(endingDate).toLocaleDateString('ru-RU')}</Typography>
          </Box>
          <LocationInfo location={location} isOnline={isOnline} />
          <ContactsInfo contacts={contacts} />
        </Stack>
        <FavouriteButton id={id} />
      </Stack>
    </Paper>
  );
};
