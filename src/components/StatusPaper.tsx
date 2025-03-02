import { Paper, PaperProps } from '@mui/material';

export const StatusPaper = (props: PaperProps) => (
  <Paper
    variant="outlined"
    {...props}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '20px',
      height: { xs: '40vh', md: '50vh' },
      ...props.sx,
    }}
  />
);
