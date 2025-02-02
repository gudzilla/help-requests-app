import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FilterType, FilterHowType } from './types';

type FilterHowProps = {
  state: FilterHowType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, filterType: FilterType) => void;
};

export function FilterHow({ state, onChange }: FilterHowProps) {
  const { material, finance } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, 'how');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl component="fieldset" variant="standard" error={false}>
        <FormLabel component="legend">Чем мы помогаем</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={material} onChange={handleChange} name="material" />
            }
            label="Вещи"
          />
          <FormControlLabel
            control={
              <Checkbox checked={finance} onChange={handleChange} name="finance" />
            }
            label="Финансирование"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
