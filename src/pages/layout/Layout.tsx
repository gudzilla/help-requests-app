import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from '@/pages/layout/components/header/Header';
import { Footer } from '@/pages/layout/components/Footer';

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Container>
        <Box
          component="main"
          sx={{
            border: '2px solid grey',
            textAlign: 'center',
            borderRadius: 2,
            p: 3,
            bgcolor: '#eee',
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
