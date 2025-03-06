import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addVolunteerFormat, removeVolunteerFormat } from '../../../state/filtersSlice';
import { useFiltersStateSelector } from '../../../state/selectors';

const isOnlineValues = {
  true: 'true',
  false: 'false',
} as const;

export const VolunteerFormat = () => {
  const {
    helperRequirements: { isOnlineArr },
  } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const value = name === isOnlineValues.true ? true : false;

    if (checked) {
      dispatch(addVolunteerFormat(value));
    } else {
      dispatch(removeVolunteerFormat(value));
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Формат</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isOnlineArr.includes(true)}
              onChange={handleFormatChange}
              name={isOnlineValues.true}
            />
          }
          label="Онлайн"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isOnlineArr.includes(false)}
              onChange={handleFormatChange}
              name={isOnlineValues.false}
            />
          }
          label="Офлайн"
        />
      </FormGroup>
    </FormControl>
  );
};
