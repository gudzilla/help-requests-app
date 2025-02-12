import { Stack, Typography } from '@mui/material';
import { ProfilePageContent } from './ProfilePageContent';

export const ProfilePage = () => {
  return (
    <Stack padding="30px 40px" spacing={2}>
      <Typography component="h1" variant="h4">
        Мой Профиль
      </Typography>
      <ProfilePageContent />
    </Stack>
  );
};
