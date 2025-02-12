import { Box, Stack, Typography } from '@mui/material';
import { TextInfoHeader } from '@/components/TextInfoHeader';
import { UserData } from '@/lib/api/types';

type HelpLocationsProps = {
  locations: UserData['baseLocations'];
};
export const HelpLocations = ({ locations }: HelpLocationsProps) => {
  if (!locations) {
    return null;
  }
  const hasMultiple = locations.length > 1;

  return (
    <Box>
      <TextInfoHeader text={hasMultiple ? 'Локации для помощи' : 'Локация для помощи'} />
      <Box>
        {locations.map((item, index) => (
          <Stack key={index} gap={'4px'}>
            <Box>
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight={500}
                marginRight="4px"
              >
                Область:
              </Typography>
              <Typography variant="body1" component="span">
                {item.district}
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight={500}
                marginRight="4px"
              >
                Населенный пункт:
              </Typography>
              <Typography variant="body1" component="span">
                {item.city}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};
