import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { EntityId } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import { ScreenEnum } from '../../../constants';
import { TextPaper } from '../../../components/TextPaper';
import { selectWebpageById } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import AppleStyleSwipeableRow, { SwipeAction } from './AppleStyleSwipableRow';
import {
  deleteWebpage,
  deleteClipboard,
  setActiveWebpageId,
  setActiveClipboardId,
} from '../../../store/slices';
import { selectClipboardById } from '../../../store/selectors/clipboardSelectors';

type Props = {
  id: EntityId;
  onPressRename: (id: string) => void;
  actionButtons?: ReactNode;
};

const ActionGroupView = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TouchableRow = styled(TouchableRipple)`
  background-color: ${({ theme }) => theme.colors.secondaryContainer};
  background-color: ${({ theme }) => theme.colors.secondaryContainer};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 3%;
  padding-vertical: 1%;
`;

const TitleText = styled(TextPaper.TitleMedium)`
  width: 73%;
  color: ${({ theme }) => theme.colors.onPrimary};
`;

const EntityRow = ({ id, actionButtons, onPressRename }: Props) => {
  const { colors, dimensions } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const webpage = useAppSelector(() => selectWebpageById(id));
  const clipboard = useAppSelector(() => selectClipboardById(id));
  const isWebpage = (id as string).startsWith('webpage') && !!webpage;
  const isClipboard = (id as string).startsWith('clipboard') && !!clipboard;

  const handleMarkerPress = () => {
    isWebpage && dispatch(setActiveWebpageId(id));
    isClipboard && dispatch(setActiveClipboardId(id));
    navigation.navigate(ScreenEnum.MARKUP);
  };

  const handleSwipeRight = () => {
    isWebpage && dispatch(deleteWebpage(webpage));
    isClipboard && dispatch(deleteClipboard(clipboard));
  };

  const swipeLeftActions: SwipeAction[] = [
    {
      label: 'Rename',
      callback: onPressRename,
      color: colors.outline,
      x: 112,
    },
  ];

  return (
    <AppleStyleSwipeableRow
      id={id}
      key={id}
      swipeLeftActions={swipeLeftActions}
      swipeRightCallback={handleSwipeRight}>
      <TouchableRow onPress={handleMarkerPress} rippleColor={colors.scrim}>
        <>
          <TitleText ellipsizeMode="tail" numberOfLines={1}>
            {webpage?.title}
          </TitleText>
          <ActionGroupView>{actionButtons}</ActionGroupView>
        </>
      </TouchableRow>
    </AppleStyleSwipeableRow>
  );
};

export type { Props as WebpageRowProps };
export default EntityRow;
