import React from 'react';
import styled from 'styled-components/native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Button, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  selectActiveNoteId,
  selectNoteIds,
  selectNotes,
} from '../store/selectors';
import {
  Note,
  createNote,
  notesAdapter,
  setActiveNoteId,
  setIds,
} from '../store/slices';
import { Screens } from '../navigation';
import { Text } from '../comp.common';

const DirectoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const noteIds = selectNoteIds();
  const notes = selectNotes();
  const activeNoteId = useAppSelector(selectActiveNoteId);

  const navigateToNote = () => navigation.navigate(Screens.NOTE);

  const handleCreateNote = () => {
    dispatch(createNote());
    navigateToNote();
  };

  const handleDragEnd = ({ data }: { data: Note[] }) => {
    // notesAdapter.sortComparer = false;
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
      <ScaleDecorator>
        <TouchableOpacity
          onPress={handlePress}
          disabled={!activeNoteId}
          onLongPress={drag}>
          <Text.H6>{item.title}</Text.H6>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <DraggableFlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item: Note) => `draggable-item-${item.id}`}
        onDragEnd={handleDragEnd}
      /> */}
      <Button onPress={handleCreateNote} title="New Note" />
    </View>
  );
};

const FileGroupHeader = styled(View)``;

export default DirectoryScreen;
