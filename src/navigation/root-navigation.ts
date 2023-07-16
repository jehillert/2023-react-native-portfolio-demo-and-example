import { createNavigationContainerRef } from '@react-navigation/native';
import { ScreensEnum } from './types';

const navigationRef = createNavigationContainerRef();

const navigate = (name: ScreensEnum, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export { navigate };
export default navigationRef;
