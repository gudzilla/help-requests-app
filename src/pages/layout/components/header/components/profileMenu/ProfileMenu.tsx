import * as React from 'react';
import { Tooltip, IconButton, Paper, Menu, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ProfileMenuList } from './ProfileMenuList';

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
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
          <ProfileMenuList closeMenu={handleCloseUserMenu} />
        </Menu>
      </Paper>
    </Box>
  );
};
