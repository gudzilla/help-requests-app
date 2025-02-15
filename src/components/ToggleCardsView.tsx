import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltIcon from '@mui/icons-material/ListAlt';

type CardsView = 'vertical' | 'horizontal' | 'map';

const iconStyles = { fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } };

export function ToggleCardsView() {
  const [view, setView] = React.useState<CardsView>('vertical');

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newAlignment: CardsView) => {
    setView(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleAlignment}
      aria-label="cards view"
      size="small"
      sx={{ alignSelf: 'flex-start' }}
    >
      <ToggleButton
        value="vertical"
        aria-label="Вертикальный вид"
        sx={{ fontSize: '2rem' }}
      >
        <GridOnIcon sx={iconStyles} />
      </ToggleButton>
      <ToggleButton value="horizontal" aria-label="Горизонтальный вид" disabled>
        <ListAltIcon sx={iconStyles} />
      </ToggleButton>
      <ToggleButton value="map" aria-label="Вид на карте" disabled>
        <LocationOnIcon sx={iconStyles} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
