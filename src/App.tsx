import React from 'react';
import {
  LogBox,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { useMessagingSubscribe, useNotificationsPermission } from './hooks';
import { DrawerNavigator } from './navigation';

LogBox.ignoreAllLogs();

const App = () => {
  useNotificationsPermission();
  useMessagingSubscribe();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
