import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutIcon from '@mui/icons-material/Logout';

type ProfileMenuItem = {
  name: string;
  icon: JSX.Element;
  navigateTo: string;
  logout: boolean;
};

export const profileMenuList: ProfileMenuItem[] = [
  {
    name: 'Мой профиль',
    icon: <PersonRoundedIcon />,
    navigateTo: '/profile',
    logout: false,
  },
  {
    name: 'Выйти',
    icon: <LogoutIcon />,
    navigateTo: '/login',
    logout: true,
  },
];
