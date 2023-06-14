import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

const DirectoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
};

export default DirectoryScreen;
