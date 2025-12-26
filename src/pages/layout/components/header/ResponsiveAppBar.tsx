import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import MainLogo from '@/assets/main-logo.svg?react';
import MainLogoOnlyText from '@/assets/main-logo-only-text.svg?react';
import { ShowOnly } from '@/components';
import { ProfileMenu } from './components/profileMenu';
import { MenuDrawer } from './MenuDrawer';
import { useScreenSize } from '@/lib/useScreenSize';

const styles = {
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  link: {
    active: { fontSize: '1.25rem', color: 'text.primary' },
    disabled: {
      fontSize: '1.25rem',
      color: 'text.secondary',
      pointerEvents: 'none',
    },
  },
};

export const ResponsiveAppBar = () => {
  const currentPath = useLocation().pathname;
  const isHelpCatalogPage = currentPath === '/help-catalog';
  const { isScreenXs } = useScreenSize();

  return (
    <AppBar position="relative" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link component={RouterLink} to="/help-catalog" sx={{ display: 'flex' }}>
              <MainLogo />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
            <MenuDrawer currentPath={currentPath} />
          </Box>
          <Box
            sx={{ justifySelf: 'center', display: { xs: 'inline-block', md: 'none' } }}
          >
            <Link
              component={RouterLink}
              to="/help-catalog"
              sx={{ display: 'flex', paddingTop: '4px' }}
            >
              {isScreenXs ? <MainLogoOnlyText /> : <MainLogo />}
            </Link>
          </Box>
          <Box
            sx={{ justifySelf: 'center', display: { xs: 'none', md: 'inline-block' } }}
          >
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
  );
};
