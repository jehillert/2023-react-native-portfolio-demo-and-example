import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Positioner, PositionerProps } from './utility';
import { Shades } from '../constants';

const PaletteView = styled(View)<{ row: boolean }>`
  flex-flow: ${({ row }) => (row ? `row` : `column`)} nowrap;
`;

const ColorElement = styled(TouchableOpacity)<{
  color: string;
  size: number;
}>`
  background-color: ${({ color }) => color};
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size}px`};
  margin: 8px;
  ${({ theme }) => theme.shadow.fab}
`;

type Props = {
  colors: Shades;
  row?: boolean;
  size?: number;
  positioning: PositionerProps;
} & TouchableOpacityProps;

const ColorPalette = ({
  colors,
  positioning,
  row = false,
  size = 30,
  ...rest
}: Props) => {
  const ColorElements = colors.map(color => {
    const handlePress = () => {};

    return (
      <ColorElement
        onPress={handlePress}
        key={color}
        size={size}
        color={color}
        {...rest}
      />
    );
  });

  return (
    <Positioner quadrant={1} {...positioning}>
      <PaletteView row={row}>{ColorElements}</PaletteView>
    </Positioner>
  );
};

export default ColorPalette;
