import { createTheme, ThemeOptions } from '@mui/material/styles';

const defaultTheme = createTheme();

const customTheme: ThemeOptions = {
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.error.main,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          'color': defaultTheme.palette.text.secondary,
          '&.Mui-focused': {
            color: defaultTheme.palette.text.secondary,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1rem',
        },
      },
    },
  },
};

export const theme = createTheme(customTheme);
