import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styled } from 'styled-components/native';
import { Provider } from 'react-redux';

import { selectHeaderHeight } from '../../store/selectors';
import { DrawerId } from '../../store/slices';
import { useAppSelector } from '../../hooks';
import { store } from '../../store/store';
import DrawerToggle from '../drawer/DrawerToggle';

const DrawerHeader = styled(View)<{
  height: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: ${({ height }) => height}px;
  padding-horizontal: 12px;
  background-color: #51150a;
`;

const DrawerContentContainer = styled(View)`
  flex: 1;
`;

type Props = {
  children: ReactNode;
  drawerId: DrawerId;
  style?: StyleProp<ViewStyle>;
};

const BaseDrawerContent = ({ children, drawerId, style }: Props) => {
  const headerHeight = useAppSelector(selectHeaderHeight);

  return (
    <Provider store={store}>
      <DrawerHeader height={headerHeight}>
        <DrawerToggle drawerId={drawerId} />
      </DrawerHeader>
      <DrawerContentContainer style={style}>{children}</DrawerContentContainer>
    </Provider>
  );
};

export default BaseDrawerContent;
