// TODO: for ios, cancel onPress when swipe begins
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styled, { useTheme } from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import { selectActiveNoteId, selectSortedNotes } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DirectoryScreenProps, ScreensEnum } from '../../navigation';
import DrawerLeft from '../NoteScreen/DrawerLeft';
import { Fab, Text } from '../../components';
import {
  Note,
  createNote,
  notesAdapter,
  removeNote,
  setActiveNoteId,
  setIds,
} from '../../store/slices';

type Props = {} & DirectoryScreenProps;

const SpacerView = styled(View)`
  margin-top: 3px;
`;

const SwipeContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.errorMain};
`;

const TouchableRowView = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grey['700']};
`;

const DirectoryScreen = ({ navigation }: Props) => {
  const { colors, shadow } = useTheme();
  const dispatch = useAppDispatch();
  const activeNoteId = useAppSelector(selectActiveNoteId);
  const sortedNotes = useAppSelector(selectSortedNotes);

  const navigateToNote = () => navigation.navigate(ScreensEnum.NOTE);

  const handleCreateNote = () => {
    dispatch(createNote());
    navigateToNote();
  };

  const handleDragEnd = ({ data }: { data: Note[] }) => {
    notesAdapter.sortComparer = false;
    const newIds = setIds(data.map(item => item.id));
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

    const handleSwipeOpened = () => {
      dispatch(removeNote(item.id));
    };

    const renderRightActions = () => {
      return (
        <SwipeContainer>
          <Icon
            name="trash-can-outline"
            color={colors.textSecondary}
            size={32}
          />
        </SwipeContainer>
      );
    };

    return (
      <Swipeable
        shouldCancelWhenOutside
        renderRightActions={renderRightActions}
        onActivated={() => console.log('onActivated')}
        onBegan={() => console.log('onBegan')}
        onCancelled={() => console.log('onCancelled')}
        onEnded={() => console.log('onEnded')}
        onFailed={() => console.log('onFailed')}
        onSwipeableClose={() => console.log('onSwipeableClose')}
        onSwipeableOpen={handleSwipeOpened}
        // onSwipeableOpen={() => console.log('onSwipeableOpen')}
        onSwipeableWillClose={() => console.log('onSwipeableWillClose')}
        onSwipeableWillOpen={() => console.log('onSwipeableWillOpen')}>
        <TouchableRowView
          onPress={handlePress}
          disabled={!activeNoteId}
          onLongPress={drag}
          delayLongPress={250}>
          <Text.H6>{item.title}</Text.H6>
        </TouchableRowView>
      </Swipeable>
    );
  };

  return (
    <DrawerLeft>
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
    </DrawerLeft>
  );
};

export default DirectoryScreen;
