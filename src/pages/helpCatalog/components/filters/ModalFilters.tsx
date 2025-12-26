import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SortIcon from '@mui/icons-material/Sort';
import { Filters } from './Filters';

const style = {
  width: { xs: '100%', sm: '70%', md: '50%' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: { xs: '100vh', sm: '80vh' },
  overflow: 'auto',
  borderRadius: 1,
};

export function ModalFilters() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="outlined"
        sx={{ padding: '10px' }}
      >
        <SortIcon color="primary" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={style}>
          <Filters sx={{ boxShadow: 'none' }} />
          <Box padding={'20px'}>
            <Button onClick={handleClose} variant="contained" size="large" fullWidth>
              ЗАКРЫТЬ
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
