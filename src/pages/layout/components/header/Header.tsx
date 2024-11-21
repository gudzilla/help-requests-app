import { Box, Link, Paper } from '@mui/material';
import MainLogo from '@/assets/main-logo.svg?react';
// FROM EXAMPLE
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ProfileMenu } from './components/profileMenu';
import { ShowOnly } from '@/components/ShowOnly';
import { LoginButton } from '@/components/LoginButton';

export const Header = () => {
  return (
    <Box component="header" mb="24px">
      <AppBar position="static">
        <Paper elevation={2}>
          <Container maxWidth="xl">
            <Toolbar sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <Box sx={{ justifySelf: 'start' }}>
                <Link href="/login">
                  <MainLogo />
                </Link>
              </Box>
              <Box sx={{ justifySelf: 'center' }}>
                <Link href="/catalog" underline="hover" color="inherit">
                  <Typography>Запросы о помощи</Typography>
                </Link>
              </Box>
              <Box sx={{ justifySelf: 'end' }}>
                <ShowOnly when="authorized" otherwise={<LoginButton />}>
                  <ProfileMenu />
                </ShowOnly>
              </Box>
            </Toolbar>
          </Container>
        </Paper>
      </AppBar>
    </Box>
  );
};
