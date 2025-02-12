import { Stack, Typography } from '@mui/material';
import { HelpRequestData } from '@/lib/api/types';
import { InfoHeader } from '../InfoHeader';
type LocationInfoProps = {
  location: HelpRequestData['location'];
  isOnline: boolean;
};
export const LocationInfo = (props: LocationInfoProps) => {
  const { location, isOnline } = props;
  return (
    <Stack gap="4px">
      <InfoHeader text="Локация" />
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
