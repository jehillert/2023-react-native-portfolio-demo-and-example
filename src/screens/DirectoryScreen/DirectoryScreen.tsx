import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import { selectActiveNoteId, selectSortedNotes } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Screens } from '../../navigation';
import { Text } from '../../components';
import {
  Note,
  createNote,
  notesAdapter,
  setActiveNoteId,
  setIds,
} from '../../store/slices';

const DirectoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const activeNoteId = useAppSelector(selectActiveNoteId);
  const sortedNotes = useAppSelector(selectSortedNotes);

  const navigateToNote = () => navigation.navigate(Screens.NOTE);

  const handleCreateNote = () => {
    dispatch(createNote());
    navigateToNote();
  };

  const handleDragEnd = ({ data }: { data: Note[] }) => {
    notesAdapter.sortComparer = false;
    const newIds = setIds(data.map(item => item.id));
    console.log(newIds);
    dispatch(setIds(data.map(item => item.id)));
  };

  const renderItem = ({
    item,
    getIndex,
    drag,
    isActive,
  }: RenderItemParams<Note>) => {
    const handlePress = () => {
      dispatch(setActiveNoteId(item.id));
      navigateToNote();
    };
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={!activeNoteId}
        onLongPress={drag}>
        <Text.H6>{item.title}</Text.H6>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={sortedNotes}
        renderItem={renderItem}
        keyExtractor={(item: Note) => `draggable-item-${item.id}`}
        onDragEnd={handleDragEnd}
      />
      <Button onPress={handleCreateNote} title="New Note" />
    </View>
  );
};

export default DirectoryScreen;
