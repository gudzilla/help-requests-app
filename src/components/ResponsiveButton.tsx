import Button, { ButtonProps } from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '@/styles/theme';

interface ResponsiveButtonProps extends ButtonProps {}

const ResponsiveButton = (props: ResponsiveButtonProps) => {
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));

  let size: 'small' | 'medium' | 'large' = 'medium';

  if (isSmall) size = 'small';
  if (isMedium) size = 'medium';
  if (isLarge) size = 'large';

  return <Button {...props} size={size} />;
};
