import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { footerMinHeight, headerMinHeight } from '@/styles/theme';

const mainStyles = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: `calc(100vh - (${headerMinHeight + footerMinHeight}))`,
  overflowY: 'scroll',
  borderLeft: 1,
  borderRight: 1,
  borderColor: 'divider',
};

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        <Box component="main" sx={mainStyles}>
          <Outlet />
          <ToastContainer />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
