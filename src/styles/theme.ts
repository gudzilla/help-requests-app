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
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 84, // Base height
          '@media (min-width:600px)': {
            minHeight: 84, // Height for screens wider than 600px
          },
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
  },
};

export const theme = createTheme(customTheme);
