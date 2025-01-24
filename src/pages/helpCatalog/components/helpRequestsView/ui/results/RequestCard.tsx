import {
  Divider,
  Stack,
  LinearProgress,
  Box,
  CardHeader,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CardImage1 from '@/assets/card-image-1.svg?react';
import CardImage2 from '@/assets/card-image-2.svg?react';
import CardImage3 from '@/assets/card-image-3.svg?react';
import { useNavigate } from 'react-router-dom';

const styles = {
  favoriteButton: {
    minWidth: '32px',
    height: '32px',
    width: '32px',
    p: 0,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginLeft: 'auto',
  },
  favoriteButtonIcon: {
    color: 'rgba(0, 0, 0, 0.56)',
  },
  title: {
    'p': 0,
    'display': '-webkit-box',
    'overflow': 'hidden',
    'WebkitBoxOrient': 'vertical',
    'lineClamp': 3,
    'WebkitLineClamp': 3,
    '& .MuiCardHeader-title': {
      lineHeight: 1.3,
    },
    // проблема в том что height меняется в 'height'
    // prettier-ignore
    height: '5.85rem',
  },
  oneLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  goalDescription: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    lineClamp: 2,
    WebkitLineClamp: 2,
  },
};

export type DataForRequestCard = {
  id: string;
  title: string;
  organization: string;
  goalDescription: string;
  endingDate: string;
  locationDistrict: string;
  locationCity: string;
  isHelpOnline: boolean;
  requesterType: 'person' | 'organization';
  helpType: 'finance' | 'material';
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
};

type RequesterType = DataForRequestCard['requesterType'];
type HelpType = DataForRequestCard['helpType'];

type RequestCardProps = {
  dataForRequestCard: DataForRequestCard;
  view: 'large' | 'small';
  isFavourite?: boolean;
};

export const RequestCard = ({
  dataForRequestCard: {
    id,
    title,
    organization,
    goalDescription,
    endingDate,
    locationCity,
    locationDistrict,
    isHelpOnline,
    contributorsCount,
    requestGoal,
    requestGoalCurrentValue,
    requesterType,
    helpType,
    // addToFavourite,
    // removeFromFavourites,
    // onDonate,
  },
  view = 'large',
  isFavourite = false,
}: RequestCardProps) => {
  const goalProgressInPercent = Math.floor((requestGoalCurrentValue / requestGoal) * 100);

  const isLargeView = view === 'large';
  const navigate = useNavigate();

  const getImage = (requesterType: RequesterType, helpType: HelpType) => {
    if (requesterType === 'organization') {
      return <CardImage2 />;
    } else if (helpType === 'finance') {
      return <CardImage1 />;
    } else {
      return <CardImage3 />;
    }
  };

  // ----------------- FAVORITE LOGIN -------------------
  // const handleAddToFavourite = (e) => {
  //   e.stopPropagation();
  //   // addToFavourite();
  // };
  // const handleRemoveFromFavourite = (e) => {
  //   e.stopPropagation();
  //   // removeFromFavourites();
  // };

  const handleCardClick = () => {
    navigate(`/help-catalog/${id}`);
  };

  const handleHelpButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log('Help Button');
    // onDonate();
  };

  return (
    <>
      {isLargeView && (
        <Card
          onClick={handleCardClick}
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 320,
          }}
        >
          <CardMedia
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {getImage(requesterType, helpType)}
          </CardMedia>
          <Box sx={{ p: '16px', display: 'flex', gap: '8px' }}>
            <CardHeader title={title} sx={styles.title} />
            {isFavourite ? (
              <Button
                variant="outlined"
                // onClick={handleRemoveFromFavourite}
                sx={styles.favoriteButton}
              >
                <StarIcon sx={styles.favoriteButtonIcon} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                // onClick={handleAddToFavourite}
                sx={styles.favoriteButton}
              >
                <StarBorderIcon sx={styles.favoriteButtonIcon} />
              </Button>
            )}
          </Box>
          <Divider />
          <Box
            sx={{
              padding: '10px 16px 20px 16px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <CardContent
              sx={{
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <Stack gap="4px">
                <Typography variant="subtitle2">Организатор</Typography>
                <Typography variant="body2" sx={styles.oneLineText}>
                  {organization}
                </Typography>
              </Stack>
              <Stack gap="4px">
                <Typography variant="subtitle2">Локация</Typography>
                {/* Conditional render for Online or with Location */}
                {isHelpOnline ? (
                  <Typography variant="body2">Онлайн</Typography>
                ) : (
                  <>
                    <Typography variant="body2" sx={styles.oneLineText}>
                      Область: {locationDistrict}
                    </Typography>
                    <Typography variant="body2" sx={styles.oneLineText}>
                      Населенный пункт: {locationCity}
                    </Typography>
                  </>
                )}
              </Stack>
              <Stack gap="4px">
                <Typography variant="subtitle2">Цель сбора</Typography>
                <Typography variant="body2" sx={styles.goalDescription}>
                  {goalDescription}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions
              sx={{ display: 'block', padding: 0, marginTop: 'auto' }}
              disableSpacing
            >
              <Stack gap="4px" marginBottom={'20px'}>
                <Typography variant="subtitle2">Завершение</Typography>
                <Typography variant="body2">
                  {new Date(endingDate).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack gap="4px" marginBottom={'10px'}>
                <Typography variant="subtitle2">Мы собрали</Typography>
                <LinearProgress
                  variant="determinate"
                  value={goalProgressInPercent}
                  sx={{ borderRadius: 1 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
                    {requestGoalCurrentValue} руб
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
                    {requestGoal} руб
                  </Typography>
                </Box>
              </Stack>
              <Stack gap="4px">
                <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
                  {contributorsCount === 0
                    ? 'Вы будете первым'
                    : `Нас уже: ${contributorsCount}`}
                </Typography>
                <Button variant="contained" onClick={handleHelpButtonClick} size="large">
                  ПОМОЧЬ
                </Button>
              </Stack>
            </CardActions>
          </Box>
        </Card>
      )}

      {/* ---------------------- SMALL VIEW --------------------*/}
      {!isLargeView && (
        <Card sx={{ width: 320 }}>
          <CardContent
            sx={{
              p: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Typography variant="h6">Вместе для добрых дел</Typography>
            <Stack gap="4px">
              <Typography variant="subtitle2">Цель сбора</Typography>
              <Typography variant="body2">{goalDescription}</Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Завершение</Typography>
              <Typography variant="body2">
                {new Date(endingDate).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Мы собрали</Typography>
              <LinearProgress
                variant="determinate"
                value={goalProgressInPercent}
                sx={{ borderRadius: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
                  {requestGoalCurrentValue} руб
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
                  {requestGoal} руб
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ display: 'block', p: '0 16px 20px 16px' }}>
            <Stack gap="4px">
              <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
                {contributorsCount === 0
                  ? 'Вы будете первым'
                  : `Нас уже: ${contributorsCount}`}
              </Typography>
              <Button
                variant="contained"
                onClick={handleHelpButtonClick}
                size="large"
                sx={{ width: '100%' }}
              >
                ПОМОЧЬ
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}
    </>
  );
};
