import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useFiltersStateSelector } from '../../state/selectors';
import { addHelpType, removeHelpType } from '../../state/filtersSlice';
import { HelpRequest } from '@/lib/api/types';

type HelpType = HelpRequest['helpType'];
type StrictHelpTypeMap = { [K in HelpType]: K };

const helpTypeValues: StrictHelpTypeMap = {
  finance: 'finance',
  material: 'material',
} as const;

export function FilterHowWeHelp() {
  const { helpType } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch(addHelpType(name as HelpType));
    } else {
      dispatch(removeHelpType(name as HelpType));
    }
  };
  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{ flex: { xs: 1, md: 'unset' } }}
    >
      <FormLabel component="legend">Чем мы помогаем</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={helpType.includes(helpTypeValues.material)}
              onChange={handleChange}
              name={helpTypeValues.material}
            />
          }
          label="Вещи"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={helpType.includes(helpTypeValues.finance)}
              onChange={handleChange}
              name={helpTypeValues.finance}
            />
          }
          label="Финансирование"
        />
      </FormGroup>
    </FormControl>
  );
}
