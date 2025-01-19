import { Button, useTheme } from '@mui/material';
import { copyToClipbord } from '../lib/copyToClipboard';
import CopyIcon from '@/assets/copy-icon.svg?react';

const copyButtonStyle = {
  padding: '4px', // Customize padding as needed
  minWidth: 'unset', // Remove the default minimum width
  width: 'auto', // Let the button size to fit the icon
};

type Props = { value: string };

export const CopyToClipboardButton = ({ value }: Props) => {
  const theme = useTheme();

  return (
    <Button
      sx={copyButtonStyle}
      onClick={() => {
        copyToClipbord(value);
      }}
    >
      <CopyIcon width="18px" height="18px" style={{ fill: theme.palette.info.main }} />
    </Button>
  );
};
