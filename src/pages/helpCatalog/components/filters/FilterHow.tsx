import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useFiltersStateSelector } from '../../state/selectors';

export function FilterHow() {
  const { helpType } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch({ type: 'filters/setHelpType', payload: name });
    } else {
      dispatch({ type: 'filters/setHelpType', payload: null });
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl component="fieldset" variant="standard" error={false}>
        <FormLabel component="legend">Чем мы помогаем</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={helpType === 'material'}
                onChange={handleChange}
                name="material"
              />
            }
            label="Вещи"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={helpType === 'finance'}
                onChange={handleChange}
                name="finance"
              />
            }
            label="Финансирование"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
