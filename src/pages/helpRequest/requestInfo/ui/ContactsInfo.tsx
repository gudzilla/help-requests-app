import { Box, Typography, Stack, Link } from '@mui/material';
import { HelpRequestData } from '@/lib/api/types';
import { InfoHeader } from '../InfoHeader';

type ContactsInfoProps = {
  contacts: HelpRequestData['contacts'];
};

const style = {
  link: { 'textDecoration': 'none', '&:hover': { textDecoration: 'underline' } },
};

export const ContactsInfo = ({ contacts }: ContactsInfoProps) => {
  return (
    <Box>
      <InfoHeader text="Контакты" />
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography fontWeight="bold" marginBottom={'4px'}>
            Телефон
          </Typography>
          <Link href={`tel:${contacts.phone}`} sx={style.link}>
            {contacts.phone}
          </Link>
        </Box>
        <Box>
          <Typography fontWeight="bold" marginBottom={'4px'}>
            E-mail
          </Typography>
          <Link href={`mailto:${contacts.email}`} sx={style.link}>
            {contacts.email}
          </Link>
        </Box>
        <Box>
          <Typography fontWeight="bold" marginBottom={'4px'}>
            Сайт
          </Typography>
          <Link
            href={
              contacts.website.startsWith('http')
                ? contacts.website
                : `https://${contacts.website}`
            }
            sx={style.link}
          >
            {contacts.website}
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};
