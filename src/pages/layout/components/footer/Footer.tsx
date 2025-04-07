import { Box, Container, Stack, Link, Typography } from '@mui/material';

const styles = {
  footer: {
    position: 'relative',
    zIndex: 10,
    background: 'background.paper',
    borderTop: 1,
    borderColor: 'divider',
    paddingBlock: '32px 32px',
  },
};

export const Footer = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="xl">
        <Stack gap={'12px'} alignItems={'center'}>
          <Link
            underline="hover"
            color="text.primary"
            href={'https://github.com/gudzilla/help-elderly'}
            target="_blank"
          >
            <Typography>Github проекта</Typography>
          </Link>
          <Typography>
            Created by{' '}
            <Link color="success" target="_blank" href="https://github.com/gudzilla/">
              Khasan
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
