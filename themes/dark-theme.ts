import { createTheme } from '@mui/material/styles';
import { red,  } from '@mui/material/colors';


export const DarkTheme = createTheme({
  palette: {
    // mode: 'light', //original
    mode: 'dark',
    primary: {
      main: '#DFDFDF'
      // main: '#c5c5c5'
      // main: '#1E1E1E'//original
    },
    secondary: {
      main: '#3A64D8' //azul
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          // backgroundColor: 'white',  //original
          // backgroundColor: '#ffffff',
          backgroundColor: '#0e1a3a', //no se xq no funciona
          // backgroundColor: 'red',
          height: 60
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },


    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            // backgroundColor: 'rgba(0,0,0,0.05)', //original
            backgroundColor: 'rgba(255, 255, 255, 0.05);',
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
    
  }
});