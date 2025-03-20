import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Link, useMediaQuery } from '@mui/material';
import MainLogo from '@/assets/main-logo.svg?react';
import MainLogoNoText from '@/assets/main-logo-no-text.svg?react';
import MainLogoOnlyText from '@/assets/main-logo-only-text.svg?react';
import { ShowOnly } from '@/components';
import { ProfileMenu } from './components/profileMenu';
import { theme } from '@/styles/theme';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
};

export const ResponsiveAppBar = () => {
  const isHelpCatalogPage = useLocation().pathname === '/help-catalog';
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolbar}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link component={RouterLink} to="/help-catalog" sx={{ display: 'flex' }}>
              <MainLogo />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  component={RouterLink}
                  to="/help-catalog"
                  underline="hover"
                  sx={isHelpCatalogPage ? styles.link.disabled : styles.link.active}
                  tabIndex={isHelpCatalogPage ? -1 : 0}
                >
                  Запросы о помощи
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{ justifySelf: 'center', display: { xs: 'inline-block', md: 'none' } }}
          >
            <Link
              component={RouterLink}
              to="/help-catalog"
              sx={{ display: 'flex', paddingTop: '4px' }}
            >
              {isSmallScreen ? <MainLogoOnlyText /> : <MainLogo />}
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
