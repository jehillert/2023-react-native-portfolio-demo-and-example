import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import React, { useEffect } from 'react';
import { Screens } from '../navigation';
import { selectActiveNoteId } from '../store/selectors';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createNote } from '../store/slices';
import { store } from '../store/store';

const DirectoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const activeNoteId = useAppSelector(selectActiveNoteId);

  useEffect(() => {
    console.log(JSON.stringify(store, undefined, 2));
  }, []);
  const navigateToNote = () => navigation.navigate(Screens.NOTE);

  const handleCreateNote = () => {
    dispatch(createNote());
    navigateToNote();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={navigateToNote}
        title="Go to Note"
        disabled={!activeNoteId}
      />
      <Button onPress={handleCreateNote} title="New Note" />
    </View>
  );
};

export default DirectoryScreen;
