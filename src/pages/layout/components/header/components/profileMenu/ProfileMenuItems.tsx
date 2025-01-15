import { Box, MenuItem, SvgIcon, Typography } from '@mui/material';
import { PROFILE_MENU_LIST } from './constants/profileMenuList';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/lib/redux/hooks';
import { logOutFx } from '@/store/authenticationSlice';

type ProfileMenuItemsProps = {
  closeMenu: () => void;
};

export const ProfileMenuItems = ({ closeMenu }: ProfileMenuItemsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box>
      {PROFILE_MENU_LIST.map((menuItem, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            closeMenu();
            if (menuItem.logout) {
              dispatch(logOutFx());
            }
            navigate(menuItem.navigateTo);
          }}
        >
          <SvgIcon sx={{ marginRight: '32px' }}>{menuItem.icon}</SvgIcon>
          <Typography sx={{ textAlign: 'center' }}>{menuItem.name}</Typography>
        </MenuItem>
      ))}
    </Box>
  );
};
