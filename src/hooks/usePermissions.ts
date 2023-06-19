import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { isAndroid, isIos } from '../constants';
import messaging from '@react-native-firebase/messaging';

const useNotificationsPermission = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    isIos && requestUserPermission();

    isAndroid && PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, []);
};

export { useNotificationsPermission };
