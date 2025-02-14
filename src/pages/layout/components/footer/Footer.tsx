import { Box, Divider, Container, Stack, Link, Typography } from '@mui/material';
import { LINKS_ARRAY } from '@/constants/links';
import { footerMinHeight } from '@/styles/theme';

const linksStackStyles = {
  minHeight: `${footerMinHeight}px`,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const Footer = () => {
  return (
    <>
      <Divider />
      <Box
        component="footer"
        sx={{
          position: 'relative',
          zIndex: 10,
          background: 'background.paper',
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" sx={linksStackStyles}>
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
    </>
  );
};
