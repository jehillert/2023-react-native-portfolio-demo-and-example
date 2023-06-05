import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { isAndroid } from '../constants';

const useNotificationsPermission = () => {
  useEffect(() => {
    isAndroid &&
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
  }, []);
};

export { useNotificationsPermission };
