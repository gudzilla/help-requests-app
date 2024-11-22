import {
  Box,
  Divider,
  Container,
  Stack,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import { LINKS_ARRAY } from '@/constants/links';

const linksStackStyles = {
  minHeight: '152px',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const Footer = () => {
  const theme = useTheme();

  return (
    <>
      <Divider />
      <Box component="footer">
        <Container maxWidth="xl">
          <Stack direction="row" sx={linksStackStyles}>
            {LINKS_ARRAY.map((link, index) => (
              <Link
                key={index}
                underline="hover"
                color={theme.palette.text.primary}
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
