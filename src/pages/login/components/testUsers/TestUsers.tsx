import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { accounts } from './constants';
import { CopyToClipboardButton } from '@/components';

const textStyle = { display: 'inline-block', marginRight: '12px' };

const lineStyle = {
  display: 'flex',
  alignItems: 'center',
};

const sectionStyle = {
  display: 'grid',
  gap: { xs: '30px', md: '90px' },
  width: '100%',
  maxWidth: { xs: '485px', md: '320px' },
};

const testUsersBoxStyle = {
  display: 'grid',
  gap: '30px',
  maxHeight: '400px',
  overflowY: 'auto',
  width: '100%',
};

export const TestUsers = () => {
  return (
    <Box component="section" sx={sectionStyle}>
      <Typography component="h2" variant="h4">
        Тестовые профили
      </Typography>
      <Box sx={testUsersBoxStyle}>
        {accounts.map(({ title, login, password }, index) => (
          <Alert severity="info" variant="outlined" key={index}>
            <AlertTitle>{title}</AlertTitle>
            <Box sx={lineStyle}>
              <CopyToClipboardButton value={login} />
              <Typography variant="body2" sx={textStyle}>{`Логин: ${login}`}</Typography>
            </Box>
            <Box sx={lineStyle}>
              <CopyToClipboardButton value={password} />
              <Typography
                variant="body2"
                sx={textStyle}
              >{`Пароль: ${password}`}</Typography>
            </Box>
          </Alert>
        ))}
      </Box>
    </Box>
  );
};
