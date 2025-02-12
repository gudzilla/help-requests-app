import { Typography } from '@mui/material';

type Props = { text: string };

export const InfoHeader = ({ text }: Props) => (
  <Typography component="h2" variant="h6" sx={{ marginBottom: '10px' }}>
    {text}
  </Typography>
);
