import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFiltersStateSelector } from '@/pages/helpCatalog/state/selectors';
import { useAppDispatch } from '@/lib/redux/hooks';
import {
  HelperRequirementsType,
  setVolunteerQualification,
} from '../../../state/filtersSlice';

const style = {
  summary: {
    'border': '1px solid',
    'borderColor': 'divider',
    '&.Mui-expanded': {
      minHeight: 'auto', // Чтобы не менялась при раскрытии
    },
    '.MuiAccordionSummary-content': {
      '&.Mui-expanded': {
        // Отступ чтобы в раскрытом виде не увеличивался размер
        margin: '12px 0',
      },
    },
  },
};

type Qualification = HelperRequirementsType['qualification'];
type StrictQualificationMap = { [K in Qualification]: K };

const qualificationValues: StrictQualificationMap = {
  professional: 'professional',
  common: 'common',
} as const;

export const FiltersVolunteer = () => {
  const {
    helperRequirements: { qualification },
  } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleQualificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      dispatch(setVolunteerQualification(name as Qualification));
    } else {
      dispatch(setVolunteerQualification(null));
    }
  };
  return (
    <Box>
      <Accordion defaultExpanded elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={style.summary}>
          <Typography component="span">Волонтерство</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Специализация</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={qualification === qualificationValues.professional}
                    onChange={handleQualificationChange}
                    name={qualificationValues.professional}
                  />
                }
                label="Квалифицированная"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={qualification === qualificationValues.common}
                    onChange={handleQualificationChange}
                    name={qualificationValues.common}
                  />
                }
                label="Не требует профессии"
              />
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
