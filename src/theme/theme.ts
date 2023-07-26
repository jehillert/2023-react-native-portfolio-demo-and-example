// https://callstack.github.io/react-native-paper/docs/guides/theming/
import { DefaultTheme } from 'styled-components/native';
import { isAndroid, isIos } from '../constants';
import { hScale } from './themeUtils';

type Colors = typeof lightColors;

const lightColors = {
  backdrop: 'rgba(51, 47, 55, 0.4)',
  background: 'rgba(142, 139, 130, 1)',
  error: '#d32f2f',
  errorContainer: 'rgb(255, 218, 214)',
  inverseOnSurface: 'rgb(245, 239, 244)',
  inversePrimary: 'rgb(220, 184, 255)',
  inverseSurface: 'rgb(50, 47, 51)',
  onBackground: 'rgb(29, 27, 30)',
  onError: 'rgb(255, 255, 255)',
  onErrorContainer: 'rgb(65, 0, 2)',
  onPrimary: 'rgba(86, 84, 80, 1)',
  onPrimaryContainer: 'rgb(44, 0, 81)',
  onSecondary: 'rgba(0, 0, 0, 0.6)',
  onSecondaryContainer: 'rgb(33, 24, 42)',
  onSurface: '#ffffff',
  onSurfaceDisabled: 'rgba(0, 0, 0, 0.26)',
  onSurfaceVariant: '#ffffff',
  onTertiary: 'rgb(255, 255, 255)',
  onTertiaryContainer: 'rgb(50, 16, 23)',
  outline: 'rgb(124, 117, 126)',
  outlineVariant: 'rgba(0, 0, 0, 0.222) 0.12)',
  primary: 'rgb(29, 27, 30)',
  primaryContainer: 'white',
  scrim: 'rgb(0, 0, 0)',
  secondary: 'rgb(102, 90, 111)',
  secondaryContainer: 'rgba(224, 217, 197, 1)', // #DBD1BA
  shadow: 'rgb(0, 0, 0)',
  surface: 'rgb(94, 93, 94)',
  surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
  surfaceVariant: '#E1DAE6',
  tertiary: 'rgb(128, 81, 88)',
  tertiaryContainer: '#681D16',
  elevation: {
    level0: 'transparent',
    level1: 'rgba(224, 217, 197, 1)',
    level2: 'rgb(54, 53, 54)',
    level3: 'rgb(240, 231, 246)',
    level4: 'rgb(239, 229, 245)',
    level5: 'rgb(236, 226, 243)',
  },
};

const darkColors: Colors = {
  backdrop: 'rgba(51, 47, 55, 0.4)',
  background: '#121212',
  error: 'rgb(255, 180, 171)',
  errorContainer: 'rgb(147, 0, 10)',
  inverseOnSurface: 'rgb(50, 47, 51)',
  inversePrimary: 'rgb(120, 69, 172)',
  inverseSurface: 'rgb(231, 225, 229)',
  onBackground: 'rgb(231, 225, 229)',
  onError: 'rgb(105, 0, 5)',
  onErrorContainer: 'rgb(255, 180, 171)',
  onPrimary: '#ffffff',
  onPrimaryContainer: 'rgb(240, 219, 255)',
  onSecondary: 'rgba(255, 255, 255, 0.7)',
  onSecondaryContainer: 'rgb(237, 221, 246)',
  onSurface: '#ffffff',
  onSurfaceDisabled: 'rgba(255, 255, 255, 0.3)',
  onSurfaceVariant: '#ffffff',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#ffffff',
  outline: 'rgb(150, 142, 152)',
  outlineVariant: 'rgba(255, 255, 255, 0.44)',
  primary: 'white',
  primaryContainer: 'tomato',
  scrim: 'rgb(0, 0, 0)',
  secondary: 'rgb(208, 193, 218)',
  secondaryContainer: '#616161',
  shadow: 'rgb(0, 0, 0)',
  surface: '#2b2b2b',
  surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
  surfaceVariant: '#681D16',
  tertiary: 'rgb(243, 183, 190)',
  tertiaryContainer: 'rgb(105, 0, 5)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(39, 35, 41)',
    level2: 'rgb(44, 40, 48)',
    level3: 'rgb(50, 44, 55)',
    level4: 'rgb(52, 46, 57)',
    level5: 'rgb(56, 49, 62)',
  },
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

const dimensions = {
  iconSmall: hScale(16),
  iconMedium: hScale(24),
  iconLarge: hScale(32),
  iconFab: hScale(56),
  cardBorderRadius: hScale(12),
};

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const baseTypography = {
  fontFamily: 'Roboto-Regular',
  fontWeight: fontWeight.medium,
  textAlignVertical: 'center',
  letterSpacing: '0px',
};

const typography = {
  displayLarge: {
    ...baseTypography,
    lineHeight: `${hScale(64)}px`,
    fontSize: `${hScale(57)}px`,
  },
  displayMedium: {
    ...baseTypography,
    lineHeight: `${hScale(52)}px`,
    fontSize: `${hScale(45)}px`,
  },
  displaySmall: {
    ...baseTypography,
    lineHeight: `${hScale(44)}px`,
    fontSize: `${hScale(36)}px`,
  },
  headlineLarge: {
    ...baseTypography,
    lineHeight: `${hScale(40)}px`,
    fontSize: `${hScale(32)}px`,
  },
  headlineMedium: {
    ...baseTypography,
    lineHeight: `${hScale(36)}px`,
    fontSize: `${hScale(28)}px`,
  },
  headlineSmall: {
    ...baseTypography,
    lineHeight: `${hScale(32)}px`,
    fontSize: `${hScale(24)}px`,
  },
  titleLarge: {
    ...baseTypography,
    lineHeight: `${hScale(28)}px`,
    fontSize: `${hScale(22)}px`,
  },
  titleMedium: {
    ...baseTypography,
    letterSpacing: '0.15px',
    fontWeight: fontWeight.medium,
    lineHeight: `${hScale(24)}px`,
    fontSize: `${hScale(16)}px`,
  },
  titleSmall: {
    ...baseTypography,
    letterSpacing: '0.1px',
    fontWeight: fontWeight.medium,
    lineHeight: `${hScale(20)}px`,
    fontSize: `${hScale(14)}px`,
  },
  labelLarge: {
    ...baseTypography,
    letterSpacing: '0.1px',
    fontWeight: fontWeight.medium,
    lineHeight: `${hScale(20)}px`,
    fontSize: `${hScale(14)}px`,
  },
  labelMedium: {
    ...baseTypography,
    letterSpacing: '0.5px',
    fontWeight: fontWeight.medium,
    lineHeight: `${hScale(16)}px`,
    fontSize: `${hScale(12)}px`,
  },
  labelSmall: {
    ...baseTypography,
    letterSpacing: '0.5px',
    fontWeight: fontWeight.medium,
    lineHeight: `${hScale(16)}px`,
    fontSize: `${hScale(11)}px`,
  },
  bodyLarge: {
    ...baseTypography,
    letterSpacing: '0.15px',
    lineHeight: `${hScale(24)}px`,
    fontSize: `${hScale(16)}px`,
  },
  bodyMedium: {
    ...baseTypography,
    letterSpacing: '0.25px',
    lineHeight: `${hScale(20)}px`,
    fontSize: `${hScale(14)}px`,
  },
  bodySmall: {
    ...baseTypography,
    letterSpacing: '0.4px',
    lineHeight: `${hScale(16)}px`,
    fontSize: `${hScale(12)}px`,
  },
};

const restOfTheme = {
  dimensions,
  fontWeight,
  shadow,
  baseTypography,
  typography,
};

const lightTheme = {
  colors: lightColors,
  ...restOfTheme,
};

const darkTheme: DefaultTheme = {
  colors: darkColors,
  ...restOfTheme,
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export { lightTheme, darkTheme };
export default theme;
