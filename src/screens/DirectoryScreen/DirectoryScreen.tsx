// TODO: for ios, cancel onPress when swipe begins
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import NoteRow from './NoteRow';
import { selectSortedNotes } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DirectoryScreenProps, ScreensEnum } from '../../navigation';
import { AppSettingsDrawerContent, BaseDrawer, Fab } from '../../components';
import {
  DrawerId,
  Note,
  createNote,
  notesAdapter,
  setIds,
} from '../../store/slices';

type Props = {} & DirectoryScreenProps;

const SpacerView = styled(View)`
  margin-top: 3px;
`;

const DirectoryScreen = ({ navigation }: Props) => {
  const { colors, shadow } = useTheme();
  const dispatch = useAppDispatch();
  const sortedNotes = useAppSelector(selectSortedNotes);

  const navigateToNote = () => navigation.navigate(ScreensEnum.NOTE);

  const handleCreateNote = () => {
    dispatch(createNote());
    navigateToNote();
  };

  const handleDragEnd = ({ data }: { data: Note[] }) => {
    notesAdapter.sortComparer = false;
    dispatch(setIds(data.map(item => item.id)));
  };

  const renderItem = (noteRowProps: RenderItemParams<Note>) => (
    <NoteRow {...noteRowProps} />
  );

  return (
    <BaseDrawer
      drawerId={DrawerId.APP_SETTINGS}
      drawerPosition="left"
      renderDrawerContent={() => <AppSettingsDrawerContent />}>
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={sortedNotes}
          renderItem={renderItem}
          keyExtractor={(item: Note) => `draggable-item-${item.id}`}
          onDragEnd={handleDragEnd}
          ItemSeparatorComponent={SpacerView}
          bounces={false}
        />
        <Fab
          onPress={handleCreateNote}
          iconProps={{
            name: 'plus-circle',
            size: 56,
            color: colors.primaryMain,
            style: shadow.fabObj,
          }}
          positioning={{ quadrant: 2 }}
        />
      </View>
    </BaseDrawer>
  );
};

export default DirectoryScreen;
