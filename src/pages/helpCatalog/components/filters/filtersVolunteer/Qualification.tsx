import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useFiltersStateSelector } from '@/pages/helpCatalog/state/selectors';
import { useAppDispatch } from '@/lib/redux/hooks';
import {
  addVolunteerQualification,
  removeVolunteerQualification,
} from '../../../state/filtersSlice';
import { HelperRequirementsType } from '../../../state/types';

type Qualification = HelperRequirementsType['qualification'];
type StrictQualificationMap = { [K in Qualification]: K };

const qualificationValues: StrictQualificationMap = {
  professional: 'professional',
  common: 'common',
} as const;

export const Qualification = () => {
  const {
    helperRequirements: { qualification },
  } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleQualificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      dispatch(addVolunteerQualification(name as Qualification));
    } else {
      dispatch(removeVolunteerQualification(name as Qualification));
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Специализация</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={qualification.includes(qualificationValues.professional)}
              onChange={handleQualificationChange}
              name={qualificationValues.professional}
            />
          }
          label="Квалифицированная"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={qualification.includes(qualificationValues.common)}
              onChange={handleQualificationChange}
              name={qualificationValues.common}
            />
          }
          label="Не требует профессии"
        />
      </FormGroup>
    </FormControl>
  );
};
