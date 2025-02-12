import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import { useAppDispatch } from '@/lib/redux/hooks';
import { logOutFx } from '@/store/authenticationReducer';

const style = {
  card: {
    alignSelf: 'flex-start',
    border: 1,
    borderColor: 'divider',
    width: '320px',
  },
};

type ProfileCardProps = {
  name: string;
  lastName: string;
  status: string;
};

export const ProfileCard = ({ name, lastName, status }: ProfileCardProps) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(logOutFx());
  };

  return (
    <Card sx={style.card} elevation={0}>
      <CardMedia sx={{ height: 240 }} title="profile picture">
        <PersonIcon
          sx={{ width: '100%', height: '100%', color: 'action.disabledBackground' }}
        />
      </CardMedia>
      <CardContent sx={{ padding: '20px' }}>
        <Box marginBottom={'30px'}>
          <Typography variant="h6" marginBottom={'10px'}>
            {`${name} ${lastName}`}
          </Typography>
          <Typography
            component="span"
            variant="subtitle1"
            fontWeight={500}
            marginRight="4px"
          >
            Статус:
          </Typography>
          <Typography variant="body1" component="span">
            {status}
          </Typography>
        </Box>
        <Button
          size="large"
          variant="outlined"
          color="inherit"
          fullWidth
          onClick={handleButtonClick}
        >
          Выйти
        </Button>
      </CardContent>
    </Card>
  );
};
