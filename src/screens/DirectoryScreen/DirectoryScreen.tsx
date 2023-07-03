import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Button, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import { selectActiveNoteId, selectSortedNotes } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Screens } from '../../navigation';
import { Fab, Text } from '../../components';
import {
  Note,
  createNote,
  notesAdapter,
  setActiveNoteId,
  setIds,
} from '../../store/slices';
import { Positioner } from '../../components/utility';

const SpacerView = styled(View)`
  margin-top: 3px;
`;

const TouchableRowView = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grey['700']};
`;

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
      <TouchableRowView
        onPress={handlePress}
        disabled={!activeNoteId}
        onLongPress={drag}>
        <Text.H6>{item.title}</Text.H6>
      </TouchableRowView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={sortedNotes}
        renderItem={renderItem}
        keyExtractor={(item: Note) => `draggable-item-${item.id}`}
        onDragEnd={handleDragEnd}
        ItemSeparatorComponent={SpacerView}
      />
      <Button onPress={handleCreateNote} title="New Note" />
      <Positioner quadrant={2}>
        <Icon name="plus-circle" color="#4F8EF7" size={56} />
      </Positioner>
    </View>
  );
};

export default DirectoryScreen;
