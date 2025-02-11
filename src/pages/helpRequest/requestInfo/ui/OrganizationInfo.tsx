import { Box, Typography } from '@mui/material';
import { RequestInfoHeader } from '../RequestInfoHeader';
import VerifiedIcon from '@mui/icons-material/Verified';
import { HelpRequestData } from '../../../../lib/api/types';

type OrganizationInfoProps = {
  organization: HelpRequestData['organization'];
};

export const OrganizationInfo = ({ organization }: OrganizationInfoProps) => {
  return (
    <Box>
      <RequestInfoHeader text="Организация" />
      <Typography mb={'4px'}>{organization.title}</Typography>
      {organization.isVerified && (
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <VerifiedIcon sx={{ color: 'primary.main', marginRight: '4px' }} />
          <Typography>Организация проверена</Typography>
        </Box>
      )}
    </Box>
  );
};
