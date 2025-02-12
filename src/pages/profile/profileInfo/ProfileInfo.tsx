import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Paper, Box, Tab } from '@mui/material';
import { UserData } from '@/lib/api/types';
import React from 'react';
import { AboutTab } from './tabs/aboutTab/AboutTab';
import { ContactsTab } from './tabs/contactsTab/ContactsTab';

const styles = {
  info: {
    border: 1,
    borderColor: 'divider',
    padding: '10px 36px 40px 36px',
    flex: 1,
  },
};

type ProfileInfoProps = {
  data: UserData;
};

type TabValues = 'about-user' | 'user-contacts' | 'user-favourites';

export const ProfileInfo = ({ data }: ProfileInfoProps) => {
  const [tabValue, setTabValue] = React.useState<TabValues>('about-user');
  const handleChange = (event: React.SyntheticEvent, newValue: TabValues) => {
    setTabValue(newValue);
  };
  return (
    <Paper elevation={0} sx={styles.info}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="profile info tabs">
              <Tab label="ЛИЧНЫЕ ДАННЫЕ" value="about-user" />
              <Tab label="КОНТАКТЫ" value="user-contacts" />
              <Tab label="ИЗБРАННОЕ" value="user-favourites" />
            </TabList>
          </Box>
          <Box paddingTop={'30px'}>
            <AboutTab data={data} />
            <ContactsTab contacts={data.contacts} />
            <TabPanel value="user-favourites">Item Three</TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Paper>
  );
};
