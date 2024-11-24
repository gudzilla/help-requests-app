import { Outlet } from 'react-router-dom';
import { Box, Container, useTheme } from '@mui/material';
import { Header } from './components/header';
import { Footer } from './components/footer';

export const Layout = () => {
  const mainStyles = {
    display: 'flex',
    flexDirection: 'column',

    // 236px is header + footer height
    minHeight: 'calc(100vh - 236px)',
    overflowY: 'scroll',
    borderLeft: 1,
    borderRight: 1,
    borderColor: 'divider',
    // todo: choose one color
    // borderColor: theme.palette.divider,
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        <Box component="main" sx={mainStyles}>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
