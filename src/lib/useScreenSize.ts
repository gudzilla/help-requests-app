import { useMediaQuery } from '@mui/material';
import { theme } from '../styles/theme';

export const useScreenSize = () => {
  const isScreenXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isScreenSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isScreenMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isScreenLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isScreenXl = useMediaQuery(theme.breakpoints.up('xl'));

  const isScreenMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isScreenLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const isScreenLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isScreenXs,
    isScreenSm,
    isScreenMd,
    isScreenLg,
    isScreenXl,
    isScreenMdDown,
    isScreenLgDown,
    isScreenLgUp,
  };
};
