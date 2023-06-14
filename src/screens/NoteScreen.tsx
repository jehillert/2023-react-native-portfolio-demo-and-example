import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

const NoteScreen = () => {
  const { goBack } = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => goBack()} title="Go back home" />
    </View>
  );
};

export default NoteScreen;
