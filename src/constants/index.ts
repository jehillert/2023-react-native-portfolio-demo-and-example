import { Platform } from 'react-native';

export const FADE_DELAY = 0;
export const FADE_DURATION = 300;
export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';

export * from './colors';
export * from './dimensions';
export * from './enums';
