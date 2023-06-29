import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import React from 'react';
import { Screens } from '../navigation';

const DirectoryScreen = () => {
  const navigation = useNavigation();

  const handleCreateNote = () => {};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate(Screens.NOTE)} title="Go to Note" />
      <Button onPress={handleCreateNote} title="New Note" />
    </View>
  );
};

export default DirectoryScreen;
