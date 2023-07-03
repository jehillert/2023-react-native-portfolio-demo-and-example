// create styled-components.d.ts in your project source
// if it isn't being picked up, check tsconfig compilerOptions.types
import {} from 'styled-components/cssprop';
import { AppTheme, lightTheme } from './theme';

type ThemeType = typeof lightTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
