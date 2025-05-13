import ErrorIcon from '@/assets/load-error.svg?react';
import { useScreenSize } from '@/lib/useScreenSize';

export const ResponsiveErrorIcon = () => {
  const { isScreenXs, isScreenSm, isScreenMd } = useScreenSize();

  if (isScreenXs) {
    return (
      <ErrorIcon style={{ alignSelf: 'center', maxWidth: '200px', height: 'auto' }} />
    );
  }
  if (isScreenSm) {
    return (
      <ErrorIcon style={{ alignSelf: 'center', maxWidth: '240px', height: 'auto' }} />
    );
  }
  if (isScreenMd) {
    return (
      <ErrorIcon style={{ alignSelf: 'center', maxWidth: '320px', height: 'auto' }} />
    );
  }
  return <ErrorIcon style={{ alignSelf: 'center' }} />;
};
