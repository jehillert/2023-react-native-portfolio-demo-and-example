import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import NoteRow from './NoteRow';
import { DirectoryScreenProps, ScreensEnum } from '../../navigation';
import { selectHeaderHeight, selectSortedNotes } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Fab } from '../../components';
import {
  Note,
  createNote,
  notesAdapter,
  setHeaderHeight,
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
  const headerHeight = useAppSelector(selectHeaderHeight);
  const rnHeaderHeight = useHeaderHeight();

  useEffect(() => {
    console.log(rnHeaderHeight);
    if (headerHeight !== rnHeaderHeight) {
      dispatch(setHeaderHeight(rnHeaderHeight));
    }
  }, []);

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
  );
};

export default DirectoryScreen;
