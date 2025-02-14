import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltIcon from '@mui/icons-material/ListAlt';

type CardsView = 'vertical' | 'horizontal' | 'map';

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
    >
      <ToggleButton
        value="vertical"
        aria-label="Вертикальный вид"
        sx={{ fontSize: '2rem' }}
      >
        <GridOnIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
      </ToggleButton>
      <ToggleButton value="horizontal" aria-label="Горизонтальный вид" disabled>
        <ListAltIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
      </ToggleButton>
      <ToggleButton value="map" aria-label="Вид на карте" disabled>
        <LocationOnIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
