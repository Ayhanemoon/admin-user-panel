import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl', // Set direction to RTL
  typography: {
    fontFamily: 'IRANYekanX, Arial, sans-serif', // Use the imported font
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default theme;