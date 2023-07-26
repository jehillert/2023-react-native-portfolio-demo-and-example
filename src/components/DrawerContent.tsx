import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styled } from 'styled-components/native';
import { Provider } from 'react-redux';

import { selectHeaderHeight } from '../store/selectors';
import { DrawerId } from '../store/slices';
import { useAppSelector } from '../hooks';
import { store } from '../store/store';
import { DrawerToggle } from './drawer/DrawerToggle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  drawerId: DrawerId;
  style?: StyleProp<ViewStyle>;
};

const DrawerHeader = styled(View)<{
  height: number;
  iconDisposition: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ iconDisposition }) => iconDisposition};
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.tertiaryContainer};
  padding-horizontal: 12px;
`;

const DrawerContentContainer = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.elevation.level1};
`;

const DrawerContent = ({ children, drawerId, style }: Props) => {
  const headerHeight = useAppSelector(selectHeaderHeight);
  const { top } = useSafeAreaInsets();
  const iconDisposition =
    drawerId === DrawerId.DOCUMENT_MAP ? 'flex-end' : 'flex-start';

  return (
    <Provider store={store}>
      <DrawerHeader
        height={headerHeight - top}
        iconDisposition={iconDisposition}>
        <DrawerToggle drawerId={drawerId} />
      </DrawerHeader>
      <DrawerContentContainer style={style}>{children}</DrawerContentContainer>
    </Provider>
  );
};

export type { Props as DrawerContentProps };
export default DrawerContent;
