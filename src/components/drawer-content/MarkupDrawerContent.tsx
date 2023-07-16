import React from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';
import { useAppSelector } from '../../hooks';
import { selectThemeId } from '../../store/selectors';
import { DrawerId } from '../../store/slices';
import _BaseDrawerContent from './BaseDrawerContent';

type Props = {
  drawerId: DrawerId;
};

const BaseDrawerContent = styled(_BaseDrawerContent)`
  padding: 8px;
`;

const MarkupDrawerContent = ({ drawerId }: Props) => {
  const themeId = useAppSelector(selectThemeId);

  return (
    <BaseDrawerContent drawerId={drawerId}>
      <Text>Document Map</Text>
    </BaseDrawerContent>
  );
};

export default MarkupDrawerContent;
