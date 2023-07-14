import React from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components';

import { selectThemeId } from '../../store/selectors';
import { DrawerId } from '../../store/slices';
import { useAppSelector } from '../../hooks';
import _BaseDrawerContent from './BaseDrawerContent';

type Props = {
  drawerId: DrawerId;
};

const BaseDrawerContent = styled(_BaseDrawerContent)`
  padding: 8px;
`;

const DocumentMapDrawerContent = ({ drawerId }: Props) => {
  const themeId = useAppSelector(selectThemeId);

  return (
    <BaseDrawerContent drawerId={drawerId}>
      <Text>Document Map</Text>
    </BaseDrawerContent>
  );
};

export default DocumentMapDrawerContent;
