import React from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { leftDrawerOpened, rightDrawerOpened } from '../store/slices';
import { IconPressable } from '../components';
import {
  selectLeftDrawerOpen,
  selectRightDrawerOpen,
} from '../store/selectors';

type DrawerProps = { drawerId: 'left' | 'right' };

const DrawerPressable = ({ drawerId }: DrawerProps) => {
  const dispatch = useAppDispatch();
  const leftDrawerOpen = useAppSelector(selectLeftDrawerOpen);
  const rightDrawerOpen = useAppSelector(selectRightDrawerOpen);
  const isLeft = drawerId === 'left';
  const handlePressMenu = () => {
    dispatch(
      isLeft
        ? leftDrawerOpened(!leftDrawerOpen)
        : rightDrawerOpened(!rightDrawerOpen),
    );
  };
  return <IconPressable name="menu" onPress={handlePressMenu} />;
};

export default DrawerPressable;
