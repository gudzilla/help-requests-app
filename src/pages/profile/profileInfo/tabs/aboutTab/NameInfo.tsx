import { Box, Stack, Typography } from '@mui/material';
import { TextInfoHeader } from '@/components';

type NameInfoProps = {
  name: string;
  lastName: string;
};

export const NameInfo = ({ name, lastName }: NameInfoProps) => {
  return (
    <Box>
      <TextInfoHeader text="Профиль" />
      <Stack gap={'4px'}>
        <Box>
          <Typography
            component="span"
            variant="subtitle1"
            fontWeight={500}
            marginRight="4px"
          >
            Фамилия:
          </Typography>
          <Typography variant="body1" component="span">
            {lastName}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            variant="subtitle1"
            fontWeight={500}
            marginRight="4px"
          >
            Имя:
          </Typography>
          <Typography variant="body1" component="span">
            {name}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
