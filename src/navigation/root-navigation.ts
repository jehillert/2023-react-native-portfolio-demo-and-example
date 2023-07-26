import { createNavigationContainerRef } from '@react-navigation/native';
import { ScreenEnum } from '../constants';

const navigationRef = createNavigationContainerRef();

const navigate = (name: ScreenEnum, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export { navigate };
export default navigationRef;
