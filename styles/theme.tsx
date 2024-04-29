import { PaletteMode, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const fontSize = 16;
export const lineHeight = 1.4;
export const heightHeader = 80;
export const borderRadius = 2;
export const boxShadow = `0 0 20px 20px rgba(0, 0, 0, 0.07)`;
export const boxShadow2 = `0 0 20px 20px ${grey[300]}`;

const theme = createTheme();
// const lightColor1 = '#004ae1';
// export const yellowColor = '#fdd300';

export const hijauRamadhan = '#006462';
export const coklatKece = '#D2B690';

export const iconSurabaya = (sizeIcon: number) => ({
  backgroundColor: hijauRamadhan,
  width: sizeIcon + 16,
  height: sizeIcon + 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  margin: theme.spacing(1, 1.5, 0, 0),
  overflow: 'hidden',
  '& .wrapper-svg': {
    width: sizeIcon,
    height: sizeIcon,
    '& svg path': {
      fill: theme.palette.common.white,
    },
  }, 
});

const getDesign = (mode: PaletteMode, negative: boolean) => ({
  palette: {
    mode,
    ...(mode == 'light' ? {
      primary: {
        main: hijauRamadhan,
      },
      secondary: {
        main: coklatKece,
      },
      text: {
        primary: '#474747',
      },
      divider : '#eaeaea',
      background: {
        paper: '#dde5ef',
      },
      grey: {
        A100: '#eef2f9',
      },
    } : {
      primary: {
        main: negative ? '#3b3d4d' : hijauRamadhan,
      },
      secondary: {
        main: negative ? '#191725' : coklatKece,
      },
      text: {
        primary: negative ? coklatKece : '#ffffff',
      },
      divider : '#3b3d4d',
      background: {
        paper: '#191725',
      },
      grey: {
        A100: '#3b3d4d',
      },
      common: negative ? {
        white: coklatKece,
        black: coklatKece,
      } : {},
    }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1152,
      xl: 1536,
    },
  },
  typography: {
    body1: negative ? {
      fontSize,
      color: `${coklatKece} !important`,
    } : {
      fontSize,
    },
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default getDesign;