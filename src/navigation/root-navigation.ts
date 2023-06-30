import { createNavigationContainerRef } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Screens } from './types';

const navigationRef = createNavigationContainerRef();

export function navigate(name: Screens, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export { navigationRef };
