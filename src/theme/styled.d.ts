import 'styled-components/native';
import theme, { ColorPalette, Typography } from './theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: ColorPalette;
    typography: Typography;
  }
}
