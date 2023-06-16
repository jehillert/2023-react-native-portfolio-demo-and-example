import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, NoteScreen } from '../screens';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Directory" component={DirectoryScreen} />
      <Stack.Screen name="Note" component={NoteScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
