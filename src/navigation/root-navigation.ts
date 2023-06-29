import { createNavigationContainerRef } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Screens } from './types';

const navigationRef = createNavigationContainerRef();

export function navigate(name: Screens, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const closeDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
};

const openDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
};

const toggleDrawer = () => {
  !!navigationRef?.current &&
    navigationRef?.current?.dispatch(DrawerActions.toggleDrawer());
};

export { navigationRef, closeDrawer, openDrawer, toggleDrawer };
