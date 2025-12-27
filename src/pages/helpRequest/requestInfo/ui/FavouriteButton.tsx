import { Button, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useFavouritesSelector } from '@/store/selectors';
import {
  useAddToFavouritesMutation,
  useDeleteFromFavouritesMutation,
} from '@/lib/api/api';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { theme } from '../../../../styles/theme';

type FavouriteButtonProps = {
  id: string;
};

const style = {
  button: {
    flexShrink: 0,
    alignSelf: 'flex-start',
    border: 1,
    borderColor: 'divider',
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textTransform: 'none',
  },
  icon: {
    color: 'action.active',
  },
};

export const FavouriteButton = ({ id }: FavouriteButtonProps) => {
  const textStyle = {
    color: 'text.primary',
    lineHeight: 1.5,
  };
  const favouritesList = useFavouritesSelector();
  const isFavourite = favouritesList.includes(id);
  const [addToFavourite] = useAddToFavouritesMutation();
  const [deleteFromFavourites] = useDeleteFromFavouritesMutation();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleAddToFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    addToFavourite(id);
  };
  const handleRemoveFromFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFromFavourites(id);
  };
  return (
    <Tooltip title={isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'}>
      <Button
        onClick={isFavourite ? handleRemoveFromFav : handleAddToFav}
        sx={style.button}
      >
        {isFavourite ? (
          <>
            <StarIcon sx={style.icon} />
            {isMdUp && (
              <Typography variant="body1" sx={textStyle}>
                Из избранного
              </Typography>
            )}
          </>
        ) : (
          <>
            <StarBorderIcon sx={style.icon} />
            {isMdUp && (
              <Typography variant="body1" sx={textStyle}>
                В избранное
              </Typography>
            )}
          </>
        )}
      </Button>
    </Tooltip>
  );
};
