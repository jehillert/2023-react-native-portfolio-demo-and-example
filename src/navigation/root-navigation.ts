import { createNavigationContainerRef } from '@react-navigation/native';
import { ScreensEnum } from './types';

const navigationRef = createNavigationContainerRef();

export function navigate(name: ScreensEnum, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default navigationRef;
