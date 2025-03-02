import { Box, Link } from '@mui/material';
import MainLogo from '@/assets/main-logo.svg?react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { ProfileMenu } from './components/profileMenu';
import { ShowOnly } from '@/components';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const styles = {
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  link: {
    active: { fontSize: '1.25rem', color: 'text.primary' },
    disabled: { fontSize: '1.25rem', color: 'text.secondary', pointerEvents: 'none' },
  },
};

export const Header = () => {
  const isHelpCatalogPage = useLocation().pathname === '/help-catalog';

  return (
    <Box component="header">
      <AppBar position="relative" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={styles.toolbar}>
            <Box sx={{ justifySelf: 'start' }}>
              <Link component={RouterLink} to="/help-catalog">
                <MainLogo />
              </Link>
            </Box>
            <Box sx={{ justifySelf: 'center' }}>
              <Link
                component={RouterLink}
                to="/help-catalog"
                underline="hover"
                sx={isHelpCatalogPage ? styles.link.disabled : styles.link.active}
                tabIndex={isHelpCatalogPage ? -1 : 0}
              >
                Запросы о помощи
              </Link>
            </Box>
            <Box sx={{ justifySelf: 'end' }}>
              <ShowOnly when="authorized" otherwise={null}>
                <ProfileMenu />
              </ShowOnly>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
