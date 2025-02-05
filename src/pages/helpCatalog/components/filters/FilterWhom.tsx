import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFiltersStateSelector } from '@/pages/helpCatalog/state/selectors';
import { useAppDispatch } from '@/lib/redux/hooks';

export function FilterWhom() {
  const { requesterType } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch({ type: 'filters/setRequesterType', payload: name });
    } else {
      dispatch({ type: 'filters/setRequesterType', payload: null });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl component="fieldset" variant="standard" error={false}>
        <FormLabel component="legend">Кому мы помогаем</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={requesterType === 'person'}
                onChange={handleChange}
                name="person"
              />
            }
            label="Пенсионерам"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={requesterType === 'organization'}
                onChange={handleChange}
                name="organization"
              />
            }
            label="Дома престарелых"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
