import { Box, Paper, Stack, Typography } from '@mui/material';
import { HelpRequestData } from '../../../lib/api/types';
import { FavouriteButton } from './ui/FavouriteButton';
import { ActionsSchedule } from './ui/ActionsSchedule';
import { LocationInfo } from './ui/LocationInfo';
import { ContactsInfo } from './ui/ContactsInfo';
import { RequestInfoHeader } from './RequestInfoHeader';
import { OrganizationInfo } from './ui/OrganizationInfo';

type RequestInfoProps = {
  request: HelpRequestData;
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
    <Paper sx={{ padding: '40px 36px 64px 36px', flex: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" gap={'30px'} sx={{ maxWidth: '550px' }}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <OrganizationInfo organization={organization} />
          <Box>
            <RequestInfoHeader text="Кому мы помогаем" />
            <Typography>{description}</Typography>
          </Box>
          <Box>
            <RequestInfoHeader text="Цель сбора" />
            <Typography>{goalDescription}</Typography>
          </Box>
          <ActionsSchedule actions={actionsSchedule} />
          <Box>
            <RequestInfoHeader text="Завершение" />
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
