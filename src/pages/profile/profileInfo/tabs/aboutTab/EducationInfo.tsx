import { Box, Stack, Typography } from '@mui/material';
import { TextInfoHeader } from '@/components/TextInfoHeader';
import { UserData } from '@/lib/api/types';

type EducationInfoProps = {
  educations: UserData['educations'];
};
export const EducationInfo = ({ educations }: EducationInfoProps) => {
  if (!educations) {
    return null;
  }

  return (
    <Box>
      <TextInfoHeader text="Профиль" />
      <Box>
        {educations.map((item, index) => (
          <Stack key={index} gap={'4px'}>
            <Box>
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight={500}
                marginRight="4px"
              >
                Учреждение:
              </Typography>
              <Typography variant="body1" component="span">
                {item.organizationName}
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight={500}
                marginRight="4px"
              >
                Уровень образования:
              </Typography>
              <Typography variant="body1" component="span">
                {item.level}
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight={500}
                marginRight="4px"
              >
                Год окончания:
              </Typography>
              <Typography variant="body1" component="span">
                {item.graduationYear}
              </Typography>
            </Box>
            {item.specialization && (
              <Box>
                <Typography
                  component="span"
                  variant="subtitle1"
                  fontWeight={500}
                  marginRight="4px"
                >
                  Направление:
                </Typography>
                <Typography variant="body1" component="span">
                  {item.specialization}
                </Typography>
              </Box>
            )}
          </Stack>
        ))}
      </Box>
    </Box>
  );
};
