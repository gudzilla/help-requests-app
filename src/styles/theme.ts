import { createTheme, ThemeOptions } from '@mui/material/styles';

const defaultTheme = createTheme();

export const headerMinHeight = 84;
export const footerMinHeight = 152;

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
  typography: {
    body1: { lineHeight: 1.5 },
    body2: { lineHeight: 1.5 },
    h1: { lineHeight: 1.5 },
    h2: { lineHeight: 1.5 },
    h3: { lineHeight: 1.5 },
    h4: { lineHeight: 1.5 },
    h5: { lineHeight: 1.5 },
    h6: { lineHeight: 1.5 },
    subtitle1: { lineHeight: 1.5 },
    subtitle2: { lineHeight: 1.5 },
    caption: { lineHeight: 1.5 },
    overline: { lineHeight: 1.5 },
    button: { lineHeight: 1.5 },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: headerMinHeight,
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
