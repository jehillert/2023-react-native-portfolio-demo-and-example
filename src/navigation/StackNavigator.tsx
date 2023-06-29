import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DirectoryScreen, MarkupScreen, NoteScreen } from '../comp.screens';
import { Screens } from './types';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'tomato' } }}>
      <Stack.Screen name={Screens.DIRECTORY} component={DirectoryScreen} />
      <Stack.Screen
        name={Screens.NOTE}
        component={NoteScreen}
        options={({ route }) => ({ title: route?.name })}
      />
      <Stack.Screen
        name={Screens.MARKUP}
        component={MarkupScreen}
        options={({ route }) => ({ title: route?.name })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
