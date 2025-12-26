import { Stack, Typography } from '@mui/material';
import { HelpRequest } from '@/lib/api/types';
import { TextInfoHeader } from '@/components';
type LocationInfoProps = {
  location: HelpRequest['location'];
  isOnline: boolean;
};
export const LocationInfo = (props: LocationInfoProps) => {
  const { location, isOnline } = props;
  return (
    <Stack gap="4px">
      <TextInfoHeader text="Локация" />
      {isOnline ? (
        <Typography>Онлайн</Typography>
      ) : (
        <>
          <Typography>
            <b>Область:</b> {location.district}
          </Typography>
          <Typography>
            <b>Населенный пункт:</b> {location.city}
          </Typography>
        </>
      )}
    </Stack>
  );
};
