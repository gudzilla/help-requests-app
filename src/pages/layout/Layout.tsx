import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from './components/header';
import { Footer } from './components/footer';

const mainStyles = {
  border: '2px solid grey',
  textAlign: 'center',
  borderRadius: 2,
  p: 3,
  bgcolor: '#eee',
  // 236px is header + footer height
  height: 'calc(100vh - 236px)',
  // todo: delete margins later
  marginBottom: '12px',
  marginTop: '12px',
};

export const Layout = () => {
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
