import { TabContext, TabList } from '@mui/lab';
import { Paper, Box, Tab } from '@mui/material';
import { UserData } from '@/lib/api/types';
import React from 'react';
import { AboutTab } from './tabs/aboutTab/AboutTab';
import { ContactsTab } from './tabs/contactsTab/ContactsTab';
import { FavouritesTab } from './tabs/FavouritesTab';
import { ToggleCardsView } from '@/components';

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
  const isFavTabSelected = tabValue === 'user-favourites';

  const handleChange = (_: React.SyntheticEvent, newValue: TabValues) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={0} sx={styles.info}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="profile info tabs"
              sx={{ borderBottom: 1, borderColor: 'divider', alignSelf: 'flex-start' }}
            >
              <Tab label="ЛИЧНЫЕ ДАННЫЕ" value="about-user" />
              <Tab label="КОНТАКТЫ" value="user-contacts" />
              <Tab label="ИЗБРАННОЕ" value="user-favourites" />
            </TabList>
            {isFavTabSelected && <ToggleCardsView />}
          </Box>
          <Box paddingTop={'20px'}>
            <AboutTab data={data} />
            <ContactsTab contacts={data.contacts} />
            <FavouritesTab />
          </Box>
        </TabContext>
      </Box>
    </Paper>
  );
};
