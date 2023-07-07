import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { IconPressable } from '..';
import { DrawerId, setDrawer } from '../../store/slices';
import { selectDrawerStateById } from '../../store/selectors';

type DrawerProps = { drawerId: DrawerId; name?: string };

const DrawerToggle = ({ drawerId, name = 'menu' }: DrawerProps) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(state => selectDrawerStateById(state, drawerId));

  const toggleDrawer = () =>
    dispatch(setDrawer({ drawerId: drawerId, newState: !open }));

  return <IconPressable name={name} onPress={toggleDrawer} />;
};

export default DrawerToggle;
