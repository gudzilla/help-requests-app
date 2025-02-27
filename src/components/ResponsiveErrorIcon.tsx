import { useMediaQuery } from '@mui/material';
import { theme } from '@/styles/theme';
import ErrorIcon from '@/assets/load-error.svg?react';

export const ResponsiveErrorIcon = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  if (isSmallScreen) {
    return (
      <ErrorIcon style={{ alignSelf: 'center', maxWidth: '200px', height: 'auto' }} />
    );
  }
  if (isMediumScreen) {
    return (
      <ErrorIcon style={{ alignSelf: 'center', maxWidth: '240px', height: 'auto' }} />
    );
  }
  if (isLargeScreen) {
    return (
      <ErrorIcon style={{ alignSelf: 'center', maxWidth: '320px', height: 'auto' }} />
    );
  }
  return <ErrorIcon style={{ alignSelf: 'center' }} />;
};
