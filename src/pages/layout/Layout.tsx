import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mainStyles = {
  height: '100%',
  borderLeft: 1,
  borderRight: 1,
  borderColor: 'divider',
  backgroundColor: '#f5f5f5',
};

export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" disableGutters>
        <Box component="main" sx={mainStyles}>
          <Outlet />
          <ToastContainer
            position="top-right"
            limit={4}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};
