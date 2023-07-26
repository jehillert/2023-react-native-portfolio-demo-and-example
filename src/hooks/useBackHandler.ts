import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function useBackHandler() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onAndroidBackPress: () => boolean = () => true;
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
    }, []),
  );

  useEffect(() => {
    navigation.addListener('beforeRemove', e => e.preventDefault());
  }, [navigation]);
}

export { useBackHandler };
