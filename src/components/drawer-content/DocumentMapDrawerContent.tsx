import React from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';

import { selectThemeId } from '../../store/selectors';
import { DrawerId } from '../../store/slices';
import { useAppSelector } from '../../hooks';
import _DrawerContent from '../DrawerContent';

type Props = {
  drawerId: DrawerId;
};

const DrawerContent = styled(_DrawerContent)`
  padding: 8px;
`;

const DocumentMapDrawerContent = ({ drawerId }: Props) => {
  const themeId = useAppSelector(selectThemeId);

  return (
    <DrawerContent drawerId={drawerId}>
      <Text>Document Map</Text>
    </DrawerContent>
  );
};

export default DocumentMapDrawerContent;
