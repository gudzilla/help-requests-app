import { Box, Link } from '@mui/material';
import MainLogo from '@/assets/main-logo.svg?react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { ProfileMenu } from './components/profileMenu';
import { ShowOnly } from '@/components';
import { headerMinHeight } from '@/styles/theme';
import { useLocation } from 'react-router-dom';

const styles = {
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    minHeight: `${headerMinHeight}px`,
  },
  // todo: delete
  linkDef: { fontSize: '1.25rem', color: 'text.primary' },
  linkDisabled: { fontSize: '1.25rem', color: 'text.secondary' },
  link: {
    active: { fontSize: '1.25rem', color: 'text.primary' },
    disabled: { fontSize: '1.25rem', color: 'text.secondary', pointerEvents: 'none' },
  },
};

// sx={{ pointerEvents: isDisabled ? "none" : "auto", color: isDisabled ? "gray" : "blue" }}

export const Header = () => {
  const isHelpCatalogPage = useLocation().pathname === '/help-catalog';

  return (
    <Box component="header">
      <AppBar position="relative" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={styles.toolbar}>
            <Box sx={{ justifySelf: 'start' }}>
              <Link href="/help-catalog">
                <MainLogo />
              </Link>
            </Box>
            <Box sx={{ justifySelf: 'center' }}>
              <Link
                href="/help-catalog"
                underline="hover"
                sx={isHelpCatalogPage ? styles.link.disabled : styles.link.active}
                tabIndex={isHelpCatalogPage ? -1 : 0}
              >
                Запросы о помощи
              </Link>

              {/*  -------------------------------- */}

              {/* {isHelpCatalogPage ? (
                <Typography sx={styles.linkDisabled}>Запросы о помощи</Typography>
              ) : (
                <Link href="/help-catalog" underline="hover" sx={styles.linkDef}>
                  Запросы о помощи
                </Link>
              )} */}
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
