import React from 'react';
import { CircledDoubleArrows } from '../assets';
import { FloatingActionGroup, FloatingActionGroupProps } from '../comp.utility';

type Props = FloatingActionGroupProps;

const DrawerFab = (props: Props) => {
  return (
    <FloatingActionGroup {...props}>
      <CircledDoubleArrows />
    </FloatingActionGroup>
  );
};

export default DrawerFab;
