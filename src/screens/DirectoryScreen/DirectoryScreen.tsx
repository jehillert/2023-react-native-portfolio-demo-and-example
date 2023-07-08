// TODO: for ios, cancel onPress when swipe begins
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styled, { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import { selectActiveNoteId, selectSortedNotes } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DirectoryScreenProps, ScreensEnum } from '../../navigation';
import {
  AppSettingsDrawerContent,
  BaseDrawer,
  Fab,
  Text,
} from '../../components';
import {
  DrawerId,
  Note,
  createNote,
  notesAdapter,
  removeNote,
  setActiveNoteId,
  setIds,
} from '../../store/slices';
import { IconButton, TouchableRipple } from 'react-native-paper';

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

const RowView = styled(View)`
  background-color: ${({ theme }) => theme.colors.grey['700']};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 3%;
  padding-vertical: 3%;
`;

const ActionGroupView = styled(View)`
  flex-direction: row;
  align-items: center;
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
    const handleNotePress = () => {
      dispatch(setActiveNoteId(item.id));
      navigateToNote();
    };

    const handleMarkerPress = () => {
      dispatch(setActiveNoteId(item.id));
      navigation.navigate(ScreensEnum.MARKUP);
    };

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
        onSwipeableWillClose={() => console.log('onSwipeableWillClose')}
        onSwipeableWillOpen={() => console.log('onSwipeableWillOpen')}>
        <RowView>
          <Text.H6>{item.title}</Text.H6>
          <ActionGroupView>
            <IconButton
              icon="text-box"
              iconColor={colors.textSecondary}
              onPress={handleNotePress}
              mode="contained-tonal"
              size={32}
            />
            <IconButton
              icon="marker"
              iconColor={colors.textSecondary}
              onPress={handleMarkerPress}
              mode="contained-tonal"
              size={28}
            />
          </ActionGroupView>
        </RowView>
      </Swipeable>
    );
  };

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
