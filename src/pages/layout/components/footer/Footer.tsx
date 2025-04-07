import { Box, Container, Stack, Link, Typography } from '@mui/material';
import { LINKS_ARRAY } from '@/constants/links';

const styles = {
  footer: {
    position: 'relative',
    zIndex: 10,
    background: 'background.paper',
    borderTop: 1,
    borderColor: 'divider',
    paddingBlock: '40px',
  },
  links: {},
};

export const Footer = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
        <Stack
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: '12px', sm: 0 },
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          {LINKS_ARRAY.map((link, index) => (
            <Link
              key={index}
              underline="hover"
              color="text.primary"
              href={link.url}
              target="_blank"
            >
              <Typography>{link.name}</Typography>
            </Link>
          ))}
        </Stack>
        <Stack>
          <Typography variant="subtitle2" color="textSecondary">
            © 2025 All right reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
