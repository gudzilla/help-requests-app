import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FilterType, FilterWhomType } from './types';

type FilterWhomProps = {
  state: FilterWhomType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, filterType: FilterType) => void;
};

export function FilterWhom({ state, onChange }: FilterWhomProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, 'whom');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl component="fieldset" variant="standard" error={false}>
        <FormLabel component="legend">Кому мы помогаем</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state === 'pensioners'}
                onChange={handleChange}
                name="pensioners"
              />
            }
            label="Пенсионерам"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state === 'eldersHome'}
                onChange={handleChange}
                name="eldersHome"
              />
            }
            label="Дома престарелых"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
