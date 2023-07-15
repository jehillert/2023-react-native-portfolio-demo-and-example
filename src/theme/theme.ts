import { DefaultTheme } from 'styled-components/native';
import { isAndroid, isIos } from '../constants';

const dimensions = {
  iconMedium: 32,
  iconSmall: 16,
};

const fabShadow = `
    ${
      isIos
        ? `
      shadow-color: #000000;
      shadow-offset: {
        width: 5px;
        height: -4px;
      };
      shadow-opacity: 0.4;
      shadow-radius: 3;
      `
        : `elevation: 5;`
    }
`;

const fabShadowObj = {
  shadowColor: '#000000',
  shadowOffset: isIos ? { width: 0, height: 2 } : undefined,
  shadowOpacity: isIos ? 0.3 : undefined,
  shadowRadius: isIos ? 4 : undefined,
  elevation: isAndroid ? 5 : undefined,
};

const shadow = {
  fab: fabShadow,
  fabObj: fabShadowObj,
};

const typography = {
  // fontFamily: 'sans-serif',
  fontFamily: 'Roboto-Regular',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

const otherThemeProps = {
  dimensions,
  shadow,
  typography,
};

const lightTheme = {
  colors: {
    actionActive: 'rgba(0, 0, 0, 0.54)',
    actionDisabled: 'rgba(0, 0, 0, 0.26)',
    actionDisabledBackground: 'rgba(0, 0, 0, 0.12)',
    actionFocus: 'rgba(0, 0, 0, 0.12)',
    actionHover: 'rgba(0, 0, 0, 0.04)',
    actionSelected: 'rgba(0, 0, 0, 0.08)',
    backgroundDefault: '#ffffff',
    backgroundPaper: '#ffffff',
    commonBlack: '#000000',
    commonWhite: '#ffffff',
    divider: 'rgba(0, 0, 0, 0.12)',
    errorContrastText: '#ffffff',
    errorDark: '#c62828',
    errorLight: '#ef5350',
    errorMain: '#d32f2f',
    infoContrastText: '#ffffff',
    infoDark: '#01579b',
    infoLight: '#03a9f4',
    infoMain: '#0288d1',
    primaryContrastText: '#ffffff',
    primaryDark: '#1565c0',
    primaryLight: '#42a5f5',
    primaryMain: '#1976d2',
    secondaryContrastText: '#ffffff',
    secondaryDark: '#7b1fa2',
    secondaryLight: '#ba68c8',
    secondaryMain: '#9c27b0',
    successContrastText: '#ffffff',
    successDark: '#1b5e20',
    successLight: '#4caf50',
    successMain: '#2e7d32',
    textContrast: '#ffffff',
    textDisabled: 'rgba(0, 0, 0, 0.38)',
    textPrimary: 'rgba(0, 0, 0, 0.87)',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    warningContrastText: '#ffffff',
    warningDark: '#e65100',
    warningLight: '#ff9800',
    warningMain: '#ed6c02',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
  },
  ...otherThemeProps,
};

const darkTheme: DefaultTheme = {
  colors: {
    actionActive: '#ffffff',
    actionDisabled: 'rgba(255, 255, 255, 0.3)',
    actionDisabledBackground: 'rgba(255, 255, 255, 0.12)',
    actionFocus: 'rgba(255, 255, 255, 0.12)',
    actionHover: 'rgba(255, 255, 255, 0.08)',
    actionSelected: 'rgba(255, 255, 255, 0.16)',
    backgroundDefault: '#121212',
    backgroundPaper: '#121212',
    commonBlack: '#000000',
    commonWhite: '#ffffff',
    divider: 'rgba(255, 255, 255, 0.12)',
    errorContrastText: '#ffffff',
    errorDark: '#d32f2f',
    errorLight: '#e57373',
    errorMain: '#f44336',
    infoContrastText: 'rgba(0, 0, 0, 0.87)',
    infoDark: '#0288d1',
    infoLight: '#4fc3f7',
    infoMain: '#29b6f6',
    primaryContrastText: 'rgba(0, 0, 0, 0.87)',
    primaryDark: '#42a5f5',
    primaryLight: '#e3f2fd',
    primaryMain: '#90caf9',
    secondaryContrastText: 'rgba(0, 0, 0, 0.87)',
    secondaryDark: '#ab47bc',
    secondaryLight: '#f3e5f5',
    secondaryMain: '#ce93d8',
    successContrastText: 'rgba(0, 0, 0, 0.87)',
    successDark: '#388e3c',
    successLight: '#81c784',
    successMain: '#66bb6a',
    textContrast: 'rgba(0, 0, 0, 0.87)',
    textDisabled: 'rgba(255, 255, 255, 0.5)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    warningContrastText: 'rgba(0, 0, 0, 0.87)',
    warningDark: '#f57c00',
    warningLight: '#ffb74d',
    warningMain: '#ffa726',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
  },
  ...otherThemeProps,
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export { lightTheme, darkTheme };
export default theme;
