import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectLeftDrawerOpen } from '../../store/selectors';
import { leftDrawerOpened } from '../../store/slices';

type Props = {
  children: ReactNode;
};

const DrawerLeft = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectLeftDrawerOpen);

  const handleOpen = () => dispatch(leftDrawerOpened(true));
  const handleClose = () => dispatch(leftDrawerOpened(false));

  return (
    <Drawer
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      drawerType="front"
      drawerPosition={'right'}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}>
      {children}
    </Drawer>
  );
};

export default DrawerLeft;
