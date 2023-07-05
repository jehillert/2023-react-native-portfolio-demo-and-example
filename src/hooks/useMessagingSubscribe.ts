import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const useMessagingSubscribe = () => {
  useEffect(() => {
    messaging().getToken();
    // .then(fcmToken => console.log(fcmToken));

    const subscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        let messageBody = remoteMessage?.notification?.body;
        let messageTitle = remoteMessage?.notification?.title;

        if (messageBody && messageTitle) {
          Alert.alert(messageTitle, messageBody);
        }
      },
    );

    return subscribe;
  }, []);
};

export { useMessagingSubscribe };
