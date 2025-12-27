import { Box } from '@mui/material';
import { AuthForm } from './components/authForm';
import { TestUsers } from './components/testUsers';

const mainLayout = {
  display: { xs: 'flex', md: 'grid' },
  flexDirection: 'column',
  gridTemplateColumns: { md: '1fr 1fr' },
  minHeight: '100%',
  backgroundColor: '#fff',
};

const sectionStyles = () => ({
  'padding': { xs: '32px 16px', md: '64px 40px' },
  'alignItems': 'start',
  'display': 'flex',
  'justifyContent': 'center',
  '&:not(:last-child)': {
    borderRight: 1,
    borderColor: 'divider',
  },
});

export const LoginPage = () => {
  return (
    <Box sx={mainLayout}>
      <Box component="section" sx={sectionStyles}>
        <AuthForm />
      </Box>
      <Box component="section" sx={sectionStyles}>
        <TestUsers />
      </Box>
    </Box>
  );
};
