import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { styled } from 'styled-components';
import { useTheme } from 'styled-components/native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../hooks/useRedux';
import { windowHeight, windowWidth } from '../constants';

type Props = {
  elements: (ReactNode | undefined)[];
  nodesPerRow: number;
  sizeAsPercentOfAxis: number;
  axis?: 'horizontal' | 'vertical';
};

const ActionMatrix = ({
  elements,
  nodesPerRow,
  sizeAsPercentOfAxis,
  axis = 'horizontal',
}: Props) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const axisSize = axis === 'horizontal' ? windowWidth : windowHeight;
  const maxSize = Math.floor((axisSize / nodesPerRow / windowWidth) * 100);
  const size = maxSize < sizeAsPercentOfAxis ? maxSize : sizeAsPercentOfAxis;
  const rowCount = Math.ceil(elements.length / nodesPerRow);
  const matrix: ReactNode[][] = Array.from(Array(rowCount), () => []);

  elements.forEach((element, index) => {
    const row = Math.floor(index / nodesPerRow);

    const elementTsx = !element ? (
      <ElementContainer
        focusable={false}
        pointerEvents="box-none"
        size={size}
        key={index}
      />
    ) : (
      <ElementContainer key={index} size={size}>
        {element}
      </ElementContainer>
    );

    matrix[row].push(elementTsx);
  });

  return (
    <MatrixContainer>
      {matrix.map((row, index) => (
        <RowContainer key={index} size={size}>
          {row}
        </RowContainer>
      ))}
    </MatrixContainer>
  );
};

const MatrixContainer = styled(View)`
  background-color: red;
`;

const RowContainer = styled(View)<{ size: number }>`
  flex-direction: row;
  height: ${({ size }) => size}%;
  background-color: lightblue;
`;

const ElementContainer = styled(View)<{ size: number }>`
  background-color: yellow;
  justify-content: center;
  align-items: center;
  height: ${({ size }) => size}%;
  width: ${({ size }) => size}%;
`;

export default ActionMatrix;
