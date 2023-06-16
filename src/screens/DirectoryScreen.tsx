import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import React from 'react';

const DirectoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Note')} title="Go to Note" />
    </View>
  );
};

export default DirectoryScreen;
