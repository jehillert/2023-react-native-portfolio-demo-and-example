import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { AnyCallback, VoidCallback } from '../../../types';
import { TextPaper } from '../../../components/TextPaper';
import { EntityId } from '@reduxjs/toolkit';

type SwipeAction = {
  label: string;
  color: string;
  callback: AnyCallback;
  x: number;
};

type Props = {
  id: EntityId;
  children: ReactNode;
  swipeRightCallback?: () => void | VoidCallback;
  swipeLeftActions?: SwipeAction[];
};

type HandleSwipeOpen =
  | ((direction: 'left' | 'right', swipeable: Swipeable) => void)
  | undefined;

const AnimatedTitleText = styled(Animated.Text)`
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 16px;
  background-color: transparent;
  padding: 10px;
`;

const RightActionRect = styled(RectButton)<{
  backgroundColor: string;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const RightActionsContainer = styled(View)<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const SwipeContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.error};
`;

const TitleText = styled(TextPaper.TitleLarge)`
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 16px;
  background-color: transparent;
  padding: 10px;
`;

const AppleStyleSwipeableRow = ({
  children,
  id,
  swipeRightCallback,
  swipeLeftActions,
}: Props) => {
  const ref = useRef<Swipeable>(null);

  const handleSwipeOpen: HandleSwipeOpen = direction => {
    if (direction === 'left') {
      swipeRightCallback && swipeRightCallback();
    }
  };

  const renderLeftAction = () => {
    return (
      <SwipeContainer>
        <AnimatedTitleText>Delete</AnimatedTitleText>
      </SwipeContainer>
    );
  };

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const pressHandler = () => {
      const pressCallback = swipeLeftActions?.find(
        ({ label }) => label === text,
      )?.callback;

      pressCallback && pressCallback(id);
      ref.current?.close();
    };

    return (
      /* @ts-ignore */
      <Animated.View
        key={text}
        style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RightActionRect backgroundColor={color} onPress={pressHandler}>
          <TitleText>{text}</TitleText>
        </RightActionRect>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const containerWidth =
      swipeLeftActions?.reduce((accum, action) => accum + action.x, 0) ?? 0;

    return (
      <RightActionsContainer width={containerWidth}>
        {swipeLeftActions?.map(({ label, color, x }) =>
          renderRightAction(label, color, x, progress),
        )}
      </RightActionsContainer>
    );
  };

  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      onSwipeableOpen={handleSwipeOpen}
      renderLeftActions={renderLeftAction}
      renderRightActions={renderRightActions}
      shouldCancelWhenOutside>
      {children}
    </Swipeable>
  );
};

export type { SwipeAction };
export default AppleStyleSwipeableRow;
