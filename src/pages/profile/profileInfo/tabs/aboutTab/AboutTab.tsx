import { TabPanel } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { TextInfoHeader } from '@/components';
import { UserData } from '@/lib/api/types';
import { EducationInfo } from './EducationInfo';
import { NameInfo } from './NameInfo';
import { HelpLocations } from './HelpLocations';

type AboutTabProps = {
  data: UserData;
};

export const AboutTab = ({ data }: AboutTabProps) => {
  const { name, lastName, birthdate, educations, additionalInfo, baseLocations } = data;
  return (
    <TabPanel value="about-user" sx={{ padding: 0, paddingTop: '10px' }}>
      <Stack direction="column" gap={'30px'} sx={{ maxWidth: '550px' }}>
        <NameInfo name={name} lastName={lastName} />
        <Box>
          <TextInfoHeader text="Дата рождения" />
          <Typography variant="body1" component="span">
            {new Date(birthdate).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
        <HelpLocations locations={baseLocations} />
        <EducationInfo educations={educations} />
        <Box>
          <TextInfoHeader text="Обо мне" />
          <Typography variant="body1" component="span">
            {additionalInfo}
          </Typography>
        </Box>
      </Stack>
    </TabPanel>
  );
};
