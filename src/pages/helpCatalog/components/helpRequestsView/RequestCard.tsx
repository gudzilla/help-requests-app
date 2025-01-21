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

const styles = {
  favoriteButton: {
    minWidth: '32px',
    height: '32px',
    width: '32px',
    p: 0,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  favoriteButtonIcon: {
    color: 'rgba(0, 0, 0, 0.56)',
  },
  title: {
    p: 0,
    display: '-webkit-box',
    overflow: 'hidden',
    lineClamp: 3, // For better compatibility
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3, // Limit to 3 lines
    // lineHeight: 1.5, // высота строки
    // height: '4.5em', // 3 строки * высота строки (1.5 * 3 = 4.5em)
  },
  goalDescription: {
    display: '-webkit-box',
    overflow: 'hidden',
    lineClamp: 2, // For better compatibility
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // Limit to 3 lines
  },
};

export type DataForRequestCard = {
  title: string;
  // organization.title
  organization: string;
  goalDescription: string;
  endingDate: string;
  // location.district
  locationDistrict: string;
  // location.city
  locationCity: string;
  // helperRequirements.isOnline
  isHelpOnline: boolean;
  requesterType: 'person' | 'organization';
  helpType: 'finance' | 'material';
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
};

type RequestCardProps = {
  dataForRequestCard: DataForRequestCard;
  view: 'large' | 'small';
  isFavourite?: boolean;
};

export const RequestCard = ({
  dataForRequestCard: {
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

  const getImage = (requesterType, helpType) => {
    if (requesterType === 'organization') {
      return <CardImage2 />;
    } else if (helpType === 'finance') {
      return <CardImage1 />;
    } else {
      return <CardImage3 />;
    }
  };

  const handleAddToFavourite = (e) => {
    e.stopPropagation();
    // addToFavourite();
  };
  const handleRemoveFromFavourite = (e) => {
    e.stopPropagation();
    // removeFromFavourites();
  };

  const handleCardClick = () => {
    //  ТУТ НАДО ОТКРЫТЬ СТРАНИЦУ Request'а
    console.log('Переход на страницу реквеста');
  };

  const handleHelpButtonClick = (e) => {
    e.stopPropagation();
    console.log('Help Button');
    // onDonate();
  };

  return (
    <>
      {isLargeView && (
        <Card onClick={handleCardClick} sx={{ maxWidth: 320 }}>
          <CardMedia
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {getImage(requesterType, helpType)}
          </CardMedia>
          <Box sx={{ p: '16px', display: 'flex' }}>
            <CardHeader title={title} sx={styles.title} />
            {isFavourite ? (
              <Button
                variant="outlined"
                onClick={handleRemoveFromFavourite}
                sx={styles.favoriteButton}
              >
                <StarIcon sx={styles.favoriteButtonIcon} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={handleAddToFavourite}
                sx={styles.favoriteButton}
              >
                <StarBorderIcon sx={styles.favoriteButtonIcon} />
              </Button>
            )}
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Stack gap="4px">
              <Typography variant="subtitle2">Организатор</Typography>
              <Typography variant="body2">{organization}</Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Локация</Typography>
              {/* Conditional render for Online or with Location */}
              {isHelpOnline ? (
                <Typography variant="body2">Онлайн</Typography>
              ) : (
                <>
                  <Typography variant="body2">Область: {locationDistrict}</Typography>
                  <Typography variant="body2">
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

      {/* ---------------------- SMALL VIEW --------------------*/}
      {!isLargeView && (
        <Card sx={{ maxWidth: 320 }}>
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

// RequestCard.propTypes = {
//   id: pt.string,
//   title: pt.string,
//   organization: pt.string,
//   goalDescription: pt.string,
//   endingDate: pt.string,
//   locationDistrict: pt.string,
//   locationCity: pt.string,
//   isHelpOnline: pt.bool,
//   contributorsCount: pt.number,
//   requestGoal: pt.number,
//   requestGoalCurrentValue: pt.number,
//   isFavourite: pt.bool,
//   addToFavourite: pt.func,
//   removeFromFavourites: pt.func,
//   onDonate: pt.func,
//   requesterType: pt.oneOf(['person', 'organization']),
//   helpType: pt.oneOf(['finance', 'material']),
//   view: pt.oneOf(['large', 'small']),
// };
