import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useFiltersStateSelector } from '@/pages/helpCatalog/state/selectors';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addVolunteersNeeded, removeVolunteersNeeded } from '../../../state/filtersSlice';
import { HelperRequirementsType } from '../../../state/types';

type HelperType = HelperRequirementsType['helperType'];
type StrictHelperTypeMap = { [K in HelperType]: K };

const helperTypeValues: StrictHelperTypeMap = {
  single: 'single',
  group: 'group',
} as const;

export const VolunteersNeeded = () => {
  const {
    helperRequirements: { helperType },
  } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleHelperTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      dispatch(addVolunteersNeeded(name as HelperType));
    } else {
      dispatch(removeVolunteersNeeded(name as HelperType));
    }
  };
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Необходимо Волонтеров</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={helperType.includes(helperTypeValues.group)}
              onChange={handleHelperTypeChange}
              name={helperTypeValues.group}
            />
          }
          label="Группа"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={helperType.includes(helperTypeValues.single)}
              onChange={handleHelperTypeChange}
              name={helperTypeValues.single}
            />
          }
          label="Один"
        />
      </FormGroup>
    </FormControl>
  );
};
