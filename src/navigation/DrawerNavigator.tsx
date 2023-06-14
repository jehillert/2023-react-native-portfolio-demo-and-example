import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DirectoryScreen, NoteScreen } from '../screens';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={DirectoryScreen} />
      <Drawer.Screen name="Notifications" component={NoteScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
