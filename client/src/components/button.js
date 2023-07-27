import { createTheme } from '@mui/material/styles';
import { colors } from './theme';

const button = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary,
          color: colors.white,
          boxShadow: colors.shadow,
          borderRadius: "10px",
          marginTop: '15px',
          fontWeight: 'bold',
          fontSize: '17px',
          '&:hover': {
            backgroundColor: colors.white,
            color: colors.primary,
          },
        },
      },
    },
  },
});

export default button;
