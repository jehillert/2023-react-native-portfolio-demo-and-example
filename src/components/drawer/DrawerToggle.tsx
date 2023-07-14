import React from 'react';
import { useTheme } from 'styled-components/native';

import { selectDrawerStateById } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DrawerId, setDrawer } from '../../store/slices';
import { CloseX } from '../../assets';
import { IconPressable } from '..';

type DrawerProps = { drawerId: DrawerId; name?: string };

const DrawerToggle = ({ drawerId, name = 'close' }: DrawerProps) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const open = useAppSelector(state => selectDrawerStateById(state, drawerId));

  const handlePress = () =>
    dispatch(setDrawer({ drawerId: drawerId, newState: !open }));

  return name === 'close' ? (
    <CloseX
      onPress={handlePress}
      stroke={colors.textPrimary}
      height={28}
      width={28}
    />
  ) : (
    <IconPressable name={name} onPress={handlePress} />
  );
};

export default DrawerToggle;
