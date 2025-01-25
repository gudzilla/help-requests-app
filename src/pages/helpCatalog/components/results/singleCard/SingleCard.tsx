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
import { styles } from './styles';
import { useContributionMutation } from '@/lib/api/api';
import { errorHandler } from '../../../../../lib/api/errorHandler';

export type DataForSingleCard = {
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

type RequesterType = DataForSingleCard['requesterType'];
type HelpType = DataForSingleCard['helpType'];

type SingleCardProps = {
  dataForRequestCard: DataForSingleCard;
  view: 'large' | 'small';
  isFavourite?: boolean;
};

export const SingleCard = (props: SingleCardProps) => {
  const {
    view = 'large',
    isFavourite = false,
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
  } = props;

  const goalProgressInPercent = Math.floor((requestGoalCurrentValue / requestGoal) * 100);
  const isLargeView = Boolean(view === 'large');
  const navigate = useNavigate();
  const [contribution, { isLoading, error }] = useContributionMutation();

  // логика выбора картинки для карточки
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

  const handleHelpButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log('Кнопка ПОМОЧЬ нажата');
    // onDonate();
    await contribution(id);
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
