import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { View } from 'react-native';

import { Note, removeNote, setActiveNoteId } from '../../store/slices';
import { ScreensEnum } from '../../navigation';
import { useAppDispatch } from '../../hooks';
import { Text } from '../../components';

type Props = RenderItemParams<Note>;

const ActionGroupView = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RowView = styled(View)`
  background-color: ${({ theme }) => theme.colors.grey['700']};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 3%;
  padding-vertical: 3%;
`;

const SwipeContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.errorMain};
`;

const TitleText = styled(Text.H6)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const NoteRow = ({ item, getIndex, isActive }: Props) => {
  const { colors, dimensions } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const navigateToNote = () => navigation.navigate(ScreensEnum.NOTE);

  const handleNotePress = () => {
    dispatch(setActiveNoteId(item.id));
    navigateToNote();
  };

  const handleMarkerPress = () => {
    dispatch(setActiveNoteId(item.id));
    navigation.navigate(ScreensEnum.MARKUP);
  };

  const handleSwipeOpened = () => {
    dispatch(removeNote(item.id));
  };

  const renderRightActions = () => {
    return (
      <SwipeContainer>
        <Icon name="trash-can-outline" color={colors.textSecondary} size={32} />
      </SwipeContainer>
    );
  };

  return (
    <Swipeable
      shouldCancelWhenOutside
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeOpened}>
      <RowView>
        <TitleText>{item.title}</TitleText>
        <ActionGroupView>
          <IconButton
            icon="text-box"
            iconColor={colors.textSecondary}
            onPress={handleNotePress}
            mode="contained-tonal"
            size={dimensions.iconMedium}
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

export default NoteRow;
