import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from './components/header';
import { Footer } from './components/footer';

const mainStyles = {
  // todo: delete later
  // CONTRAST STYLE
  // border: '2px solid grey',
  // bgcolor: '#eee',
  // marginBottom: '12px',
  // marginTop: '12px',

  // 236px is header + footer height
  height: 'calc(100vh - 236px)',
  // todo: delete margins later
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
