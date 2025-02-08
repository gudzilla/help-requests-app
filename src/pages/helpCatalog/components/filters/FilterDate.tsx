import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setFilterDate } from '../../state/filtersSlice';
import { ru } from 'date-fns/locale';
import { FormControl, FormLabel, IconButton, InputAdornment } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { useFiltersStateSelector } from '../../state/selectors';

export const FilterDate = () => {
  const dispatch = useAppDispatch();
  const { helpDate } = useFiltersStateSelector();
  const hasData = helpDate !== null;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      {/* <DatePicker
        label="Выберите дату"
        onChange={(newValue) => dispatch(setFilterDate(newValue))}
      /> */}
      <FormControl>
        <FormLabel sx={{ marginBottom: '10px' }}>Помощь актуальна до:</FormLabel>
        <DatePicker
          value={helpDate}
          onChange={(newValue) => dispatch(setFilterDate(newValue))}
          slotProps={{
            textField: ({ inputProps, ...params }) => ({
              ...params,
              placeholder: 'Выберите дату',
              fullWidth: true,
              sx: {
                '& .MuiOutlinedInput-input': {
                  padding: '12px',
                  paddingRight: 0,
                },
              },
              InputProps: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {hasData && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            dispatch(setFilterDate(null));
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                    {params.InputProps?.endAdornment}
                  </>
                ),
              },
            }),
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
};
