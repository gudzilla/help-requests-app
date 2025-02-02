import { Divider, Box, Card } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import { useContributionMutation } from '@/lib/api/api';
import { DataForSingleCard } from './types';
import { SingleCardHeader } from './SingleCardHeader';
import { SingleCardContent } from './SingleCardContent';
import { SingleCardActions } from './SingleCardActions';

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
    },
  } = props;

  const goalProgressInPercent = Math.floor((requestGoalCurrentValue / requestGoal) * 100);
  const navigate = useNavigate();
  const [contribution] = useContributionMutation();

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
    await contribution(id);
  };

  if (view === 'large') {
    return (
      <Card onClick={handleCardClick} elevation={3} sx={styles.card}>
        <SingleCardHeader
          helpType={helpType}
          isFavourite={isFavourite}
          requesterType={requesterType}
          title={title}
        />
        <Divider />
        <Box sx={styles.cardBody}>
          <SingleCardContent
            isHelpOnline={isHelpOnline}
            goalDescription={goalDescription}
            organization={organization}
            locationCity={locationCity}
            locationDistrict={locationDistrict}
          />
          <SingleCardActions
            requestGoal={requestGoal}
            contributorsCount={contributorsCount}
            endingDate={endingDate}
            goalProgressInPercent={goalProgressInPercent}
            requestGoalCurrentValue={requestGoalCurrentValue}
            handleHelpButtonClick={handleHelpButtonClick}
          />
        </Box>
      </Card>
    );
  }
};
