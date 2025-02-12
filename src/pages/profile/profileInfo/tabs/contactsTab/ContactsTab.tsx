import { TabPanel } from '@mui/lab';
import { Box, Link, Stack, Typography } from '@mui/material';
import { UserData } from '@/lib/api/types';
import { TextInfoHeader } from '@/components';
import VkIcon from '@/assets/vk-icon.svg?react';
import TgIcon from '@/assets/telegram-icon.svg?react';
import WhatsappIcon from '@/assets/whatsapp-icon.svg?react';

const style = {
  link: { 'textDecoration': 'none', '&:hover': { textDecoration: 'underline' } },
};

type ContactsTabProps = {
  contacts: UserData['contacts'];
};

export const ContactsTab = ({ contacts }: ContactsTabProps) => {
  const { social } = contacts;
  console.log(social);
  return (
    <TabPanel value="user-contacts" sx={{ padding: 0, paddingTop: '10px' }}>
      <Stack direction="column" gap={'30px'} sx={{ maxWidth: '550px' }}>
        <Box>
          <TextInfoHeader text="E-mail" />
          <Link href={`mailto:${contacts.email}`} sx={style.link}>
            {contacts.email}
          </Link>
        </Box>
        <Box>
          <TextInfoHeader text="Телефон" />
          <Link href={`tel:${contacts.phone}`} sx={style.link}>
            {contacts.phone}
          </Link>
        </Box>
        <Stack gap={'4px'}>
          <TextInfoHeader text="Социальные сети" />
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <VkIcon />
            <Typography variant="body1" component="span">
              {social.vk}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <TgIcon />
            <Typography variant="body1" component="span">
              {social.telegram}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <WhatsappIcon />
            <Typography variant="body1" component="span">
              {social.whatsapp}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </TabPanel>
  );
};
