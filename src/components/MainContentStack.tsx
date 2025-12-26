import { Stack, StackProps } from '@mui/material';
export const MainContentStack = (props: StackProps) => {
  return (
    <Stack
      {...props}
      gap="20px"
      paddingY="30px"
      paddingX={{ xs: 0, md: '16px', lg: '40px' }}
    />
  );
};
