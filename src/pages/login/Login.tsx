import { Box, Switch, Typography } from '@mui/material';
import { AuthForm } from './components/authForm';
import { TestUsers } from './components/testUsers';
import { useState } from 'react';

const mainLayout = {
  flexGrow: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '100%',
};

const sectionStyles = {
  padding: '64px 40px',
  '&:not(:last-child)': { borderRight: 1, borderColor: 'divider' },
};

export const Login = () => {
  const [gotError, setGotError] = useState(false);
  const handleToggleSwitch = () => {
    setGotError(!gotError);
  };

  return (
    <Box sx={mainLayout}>
      <Box component="section" sx={sectionStyles}>
        <Typography>
          Form Error <Switch onChange={handleToggleSwitch} />
        </Typography>
        <AuthForm
          // todo: pass the real error
          error={gotError}
        />
      </Box>
      <Box component="section" sx={sectionStyles}>
        <TestUsers />
      </Box>
    </Box>
  );
};
