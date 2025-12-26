import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type MenuDrawerProps = {
  currentPath: string;
};

const styles = {
  link: {
    active: { fontSize: '1.25rem', color: 'text.primary' },
    disabled: {
      fontSize: '1.25rem',
      color: 'text.secondary',
      pointerEvents: 'none',
    },
  },
};

export function MenuDrawer({ currentPath }: MenuDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const isHelpCatalogPage = currentPath === '/help-catalog';

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography padding="16px" variant="h5">
        МЕНЮ
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={
              isHelpCatalogPage
                ? { borderRadius: 1, backgroundColor: '#ebf5ff', pointerEvents: 'none' }
                : null
            }
            tabIndex={isHelpCatalogPage ? -1 : 0}
          >
            <ListItemText>
              <Link
                component={RouterLink}
                to="/help-catalog"
                underline="none"
                sx={isHelpCatalogPage ? styles.link.disabled : styles.link.active}
                tabIndex={isHelpCatalogPage ? -1 : 0}
              >
                Запросы о помощи
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
