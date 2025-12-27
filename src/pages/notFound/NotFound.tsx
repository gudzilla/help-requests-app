import { Container, Stack, Typography } from '@mui/material';
import { ResponsiveErrorIcon } from '../../components/ResponsiveErrorIcon';
import { StatusPaper } from '@/components/StatusPaper';

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%',
  padding: '20px',
  flex: 1,
};

export const NotFound = () => {
  return (
    <Container maxWidth="md" sx={containerStyles}>
      <StatusPaper sx={{ width: '100%', height: 'auto', minHeight: '50vh' }}>
        <Stack gap={{ xs: '16px', md: '24px' }} alignItems="center">
          <ResponsiveErrorIcon />
          <Typography
            component="h2"
            variant="h5"
            textAlign="center"
            sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
          >
            404 Error: Page Not Found
          </Typography>
        </Stack>
      </StatusPaper>
    </Container>
  );
};
