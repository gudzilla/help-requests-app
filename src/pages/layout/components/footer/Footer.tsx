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
  links: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const Footer = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="xl">
        <Stack direction="row" sx={styles.links}>
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
      </Container>
    </Box>
  );
};
