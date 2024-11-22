import { Box, MenuItem, SvgIcon, Typography } from '@mui/material';
import { PROFILE_MENU_LIST } from '@/pages/layout/components/header/components/profileMenu/constants/profileMenuList';
import { useNavigate } from 'react-router-dom';

type ProfileMenuItemsProps = {
  closeMenu: () => void;
};

export const ProfileMenuItems = ({ closeMenu }: ProfileMenuItemsProps) => {
  const navigate = useNavigate();

  // todo: make read handler
  const handleMenuItemClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <Box>
      {PROFILE_MENU_LIST.map((menuItem, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            closeMenu();
            if (menuItem.logout) {
              // todo: add logout
              console.log('Выход из аккаунта (в разработке)');
            }
            handleMenuItemClick(menuItem.navigateTo);
          }}
        >
          <SvgIcon sx={{ marginRight: '32px' }}>{menuItem.icon}</SvgIcon>
          <Typography sx={{ textAlign: 'center' }}>{menuItem.name}</Typography>
        </MenuItem>
      ))}
    </Box>
  );
};
