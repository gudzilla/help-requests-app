import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFiltersStateSelector } from '@/pages/helpCatalog/state/selectors';
import { useAppDispatch } from '@/lib/redux/hooks';
import { HelpRequest } from '@/lib/api/types';
import { addRequesterType, removeRequesterType } from '../../state/filtersSlice';

type RequesterType = HelpRequest['requesterType'];
type StrictRequesterTypeMap = { [K in RequesterType]: K };

const requesterTypeValues: StrictRequesterTypeMap = {
  person: 'person',
  organization: 'organization',
} as const;

export function FilterWhomWeHelp() {
  const { requesterType } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch(addRequesterType(name as RequesterType));
    } else {
      dispatch(removeRequesterType(name as RequesterType));
    }
  };

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{ flex: { xs: 1, md: 'unset' } }}
    >
      <FormLabel component="legend">Кому мы помогаем</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={requesterType.includes(requesterTypeValues.person)}
              onChange={handleChange}
              name={requesterTypeValues.person}
            />
          }
          label="Пенсионерам"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={requesterType.includes(requesterTypeValues.organization)}
              onChange={handleChange}
              name={requesterTypeValues.organization}
            />
          }
          label="Дома престарелых"
        />
      </FormGroup>
    </FormControl>
  );
}
