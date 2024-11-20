import * as React from 'react';
import { Tooltip, IconButton, Paper, Menu, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ProfileMenuItems } from '@/pages/layout/components/header/components/profileMenu/ProfileMenuItems';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // todo: replace with real isAuth later
  const isAuth = true;
  const navigate = useNavigate();

  if (!isAuth) {
    return (
      <Button
        variant="outlined"
        size="medium"
        color="default"
        endIcon={<KeyboardArrowRightIcon />}
        onClick={() => {
          navigate('/login');
        }}
      >
        Войти
      </Button>
    );
  }

  return (
    <>
      <Tooltip title="Открыть меню профиля">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon sx={{ color: '#BDBDBD', height: '40px', width: '40px' }} />
        </IconButton>
      </Tooltip>
      <Paper elevation={8}>
        <Menu
          sx={{ mt: '45px', padding: '0' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <ProfileMenuItems closeMenu={handleCloseUserMenu} />
        </Menu>
      </Paper>
    </>
  );
};
