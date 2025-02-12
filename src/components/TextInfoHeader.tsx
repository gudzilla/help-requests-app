import { Typography } from '@mui/material';

type Props = { text: string };

export const TextInfoHeader = ({ text }: Props) => (
  <Typography component="h3" variant="h6" sx={{ marginBottom: '10px' }}>
    {text}
  </Typography>
);
