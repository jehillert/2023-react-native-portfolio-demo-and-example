import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DirectoryScreen, NoteScreen } from '../comp.screens';
import { DrawerParamList, Screens, StackNavigator } from '.';

const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * NEED TO MAKE SURE THIS ISN'T DUPLICATING THE SCREENS
 */
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Screens.HOME}
      screenOptions={{ swipeEnabled: false, headerShown: false }}>
      <Drawer.Screen name={Screens.HOME} component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
