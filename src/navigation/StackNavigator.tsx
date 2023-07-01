import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, NoteScreen } from '../comp.screens';
import { Screens } from './types';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: 'tomato' } }}>
      <Stack.Screen name={Screens.DIRECTORY} component={DirectoryScreen} />
      <Stack.Screen
        name={Screens.NOTE}
        component={NoteScreen}
        options={({ route }) => ({ title: 'Notes' })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
