import { Divider, Box, Card, Grid2 as Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import {
  useAddToFavouritesMutation,
  useContributionMutation,
  useDeleteFromFavouritesMutation,
} from '@/lib/api/api';
import { RequestCardData } from './types';
import { SingleCardHeader } from './SingleCardHeader';
import { SingleCardContent } from './SingleCardContent';
import { SingleCardActions } from './SingleCardActions';
import { useFavouritesSelector } from '@/store/selectors';
import { debounce } from 'lodash';

type SingleCardProps = {
  requestCardData: RequestCardData;
  isFavourite?: boolean;
};

export const SingleCard = (props: SingleCardProps) => {
  const {
    requestCardData: {
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
    },
  } = props;

  const goalProgressInPercent = Math.floor((requestGoal / requestGoalCurrentValue) * 100);
  const navigate = useNavigate();
  const [contribution, { isLoading: isContributionLoading }] = useContributionMutation();
  const [addToFavourites] = useAddToFavouritesMutation();
  const [deleteFromFavourites] = useDeleteFromFavouritesMutation();
  const favouritesList = useFavouritesSelector();
  const isFavourite = favouritesList.includes(id);

  // ----------------- FAVORITES: Add/Remove -------------------
  const handleAddToFavourite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    addToFavourites(id);
  };
  const handleRemoveFromFavourite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    deleteFromFavourites(id);
  };
  // -----------------------------------------------------

  const handleCardClick = () => {
    navigate(`/help-catalog/${id}`);
  };

  const handleHelpButtonClick = debounce(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      await contribution(id);
    },
    200
  );

  return (
    <Grid size={{ xs: 12, sm: 6, xl: 4 }}>
      <Card elevation={3} sx={styles.card}>
        <SingleCardHeader
          helpType={helpType}
          isFavourite={isFavourite}
          requesterType={requesterType}
          title={title}
          addToFavourite={handleAddToFavourite}
          removeFromFavourite={handleRemoveFromFavourite}
          onCardClick={handleCardClick}
        />
        <Divider />
        <Box sx={styles.cardBody}>
          <SingleCardContent
            isHelpOnline={isHelpOnline}
            goalDescription={goalDescription}
            organization={organization}
            locationCity={locationCity}
            locationDistrict={locationDistrict}
            onCardClick={handleCardClick}
          />
          <SingleCardActions
            requestGoal={requestGoalCurrentValue}
            contributorsCount={contributorsCount}
            endingDate={endingDate}
            goalProgressInPercent={goalProgressInPercent}
            requestGoalCurrentValue={requestGoal}
            handleHelpButtonClick={handleHelpButtonClick}
            isLoading={isContributionLoading}
            onCardClick={handleCardClick}
          />
        </Box>
      </Card>
    </Grid>
  );
};
