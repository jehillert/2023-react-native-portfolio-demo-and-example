import React from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps, View, ViewStyle } from 'react-native';
import { Positioner, PositionerProps } from './utility';
import { Shades } from '../constants';

const PaletteView = styled(View)<{ row: boolean }>`
  flex-flow: ${({ row }) => (row ? `row` : `column`)} nowrap;
`;

const ColorElement = styled(Pressable)<{
  color: string;
  size: number;
}>`
  background-color: ${({ color }) => color};
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size}px`};
  margin: 8px;
`;

type Props = {
  colors: Shades;
  row?: boolean;
  size?: number;
  positioning: PositionerProps;
} & PressableProps;

const ColorPalette = ({
  colors,
  positioning,
  row = false,
  size = 30,
  ...rest
}: Props) => {
  const ColorElements = colors.map(color => {
    return <ColorElement key={color} size={size} color={color} {...rest} />;
  });

  return (
    <Positioner quadrant={1} {...positioning}>
      <PaletteView row={row}>{ColorElements}</PaletteView>
    </Positioner>
  );
};

export default ColorPalette;
