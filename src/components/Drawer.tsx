import React, { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { DrawerProps } from 'react-native-drawer-layout/lib/typescript/src/types';
import { Drawer as _Drawer } from 'react-native-drawer-layout';
import { selectDrawerStateById } from '../store/selectors';
import { DrawerId, setDrawer } from '../store/slices';
import { useAppDispatch, useAppSelector } from '../hooks';

type Props = {
  children: ReactNode;
  drawerId: DrawerId;
  drawerType?: 'front' | 'slide' | 'back' | 'permanent' | undefined;
  renderDrawerContent?: () => React.ReactNode;
} & Partial<DrawerProps>;

const BaseDrawer = styled(_Drawer)`
  z-index: 10;
  elevation: 10;
  flex: 1;
`;

const DummyDrawerContent = () => <Text>Drawer content</Text>;

const Drawer = ({
  drawerId,
  children,
  drawerType = 'front',
  renderDrawerContent = DummyDrawerContent,
  ...rest
}: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const open = useAppSelector(state => selectDrawerStateById(state, drawerId));
  const drawerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.surface,
  };

  const handleOpen = () => dispatch(setDrawer({ drawerId, newState: true }));
  const handleClose = () => dispatch(setDrawer({ drawerId, newState: false }));

  return (
    <BaseDrawer
      drawerStyle={drawerStyle}
      drawerType="front"
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      renderDrawerContent={renderDrawerContent}
      useLegacyImplementation={false}
      swipeEnabled={false}
      {...rest}>
      {children}
    </BaseDrawer>
  );
};

export type { Props as DrawerProps };
export { Drawer };
