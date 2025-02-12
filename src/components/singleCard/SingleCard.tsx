import { Divider, Box, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import {
  useAddToFavouritesMutation,
  useContributionMutation,
  useDeleteFromFavouritesMutation,
} from '@/lib/api/api';
import { DataForSingleCard } from './types';
import { SingleCardHeader } from './SingleCardHeader';
import { SingleCardContent } from './SingleCardContent';
import { SingleCardActions } from './SingleCardActions';
import { useFavouritesSelector } from '@/store/selectors';
import { debounce } from 'lodash';

type SingleCardProps = {
  dataForRequestCard: DataForSingleCard;
  isFavourite?: boolean;
};

export const SingleCard = (props: SingleCardProps) => {
  const {
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
    },
  } = props;

  const goalProgressInPercent = Math.floor((requestGoalCurrentValue / requestGoal) * 100);
  const navigate = useNavigate();
  const [contribution, { isLoading: isLoadingContribution }] = useContributionMutation();
  const [addToFavourite] = useAddToFavouritesMutation();
  const [deleteFromFavourites] = useDeleteFromFavouritesMutation();
  const favouritesList = useFavouritesSelector();
  const isFavourite = favouritesList.includes(id);

  // ----------------- FAVORITES: Add/Remove -------------------
  const handleAddToFavourite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    addToFavourite(id);
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
          requestGoal={requestGoal}
          contributorsCount={contributorsCount}
          endingDate={endingDate}
          goalProgressInPercent={goalProgressInPercent}
          requestGoalCurrentValue={requestGoalCurrentValue}
          handleHelpButtonClick={handleHelpButtonClick}
          isLoading={isLoadingContribution}
          onCardClick={handleCardClick}
        />
      </Box>
    </Card>
  );
};
