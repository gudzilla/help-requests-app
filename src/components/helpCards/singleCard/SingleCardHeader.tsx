import { Box, Button, CardHeader, CardMedia, Tooltip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { CardHelpType, CardRequesterType } from './types';
import { styles } from './styles';
import { HelpRequestImage } from './HelpRequestImage';

type SingleCardHeaderProps = {
  title: string;
  requesterType: CardRequesterType;
  helpType: CardHelpType;
  isFavourite: boolean;
  addToFavourite: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  removeFromFavourite: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCardClick: () => void;
};

export const SingleCardHeader = (props: SingleCardHeaderProps) => {
  const {
    title,
    requesterType,
    helpType,
    isFavourite,
    addToFavourite,
    removeFromFavourite,
    onCardClick,
  } = props;
  return (
    <Box onClick={onCardClick}>
      <CardMedia sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <HelpRequestImage helpType={helpType} requesterType={requesterType} />
      </CardMedia>
      <Box sx={{ p: '16px', display: 'flex', gap: '8px' }}>
        <CardHeader
          title={title}
          titleTypographyProps={{ component: 'h3' }}
          sx={styles.title}
        />
        <Tooltip title={isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'}>
          <Button
            onClick={isFavourite ? removeFromFavourite : addToFavourite}
            sx={styles.favoriteButton}
          >
            {isFavourite ? (
              <StarIcon sx={styles.favIcon} />
            ) : (
              <StarBorderIcon sx={styles.favIcon} />
            )}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
