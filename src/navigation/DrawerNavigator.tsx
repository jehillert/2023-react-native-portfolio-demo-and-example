import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DirectoryScreen, NoteScreen } from '../screens';
import { DrawerParamList } from '.';

const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * NEED TO MAKE SURE THIS ISN'T DUPLICATING THE SCREENS
 */
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Directory">
      <Drawer.Screen name="Directory" component={DirectoryScreen} />
      <Drawer.Screen name="Note" component={NoteScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
