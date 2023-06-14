import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DirectoryScreen, NoteScreen } from '../screens';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Directory">
      <Drawer.Screen name="Directory" component={DirectoryScreen} />
      <Drawer.Screen name="Note" component={NoteScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
