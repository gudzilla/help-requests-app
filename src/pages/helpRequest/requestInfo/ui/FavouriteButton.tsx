import { Button, Tooltip, Typography } from '@mui/material';
import { useFavouritesSelector } from '@/store/selectors';
import {
  useAddToFavouritesMutation,
  useDeleteFromFavouritesMutation,
} from '@/lib/api/api';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

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
            <Typography
              variant="body1"
              sx={{ ...textStyle, display: { xs: 'none', md: 'block' } }}
            >
              Из избранного
            </Typography>
          </>
        ) : (
          <>
            <StarBorderIcon sx={style.icon} />
            <Typography
              variant="body1"
              sx={{ ...textStyle, display: { xs: 'none', md: 'block' } }}
            >
              Из избранного
            </Typography>
          </>
        )}
      </Button>
    </Tooltip>
  );
};
