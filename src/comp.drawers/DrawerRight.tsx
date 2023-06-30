import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { selectRightDrawerOpen } from '../store/selectors';
import { rightDrawerOpened } from '../store/slices';

type Props = {
  children: ReactNode;
};

const DrawerRight = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectRightDrawerOpen);

  const handleOpen = () => dispatch(rightDrawerOpened(true));
  const handleClose = () => dispatch(rightDrawerOpened(false));

  return (
    <Drawer
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      drawerPosition={'right'}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}>
      {children}
    </Drawer>
  );
};

export default DrawerRight;
