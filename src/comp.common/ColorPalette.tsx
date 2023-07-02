import React from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps } from 'react-native';
import { Shades } from '../constants';
import { FloatingActionGroup } from '../comp.utility';
import { SizeUnits } from '../types';

type Props = {
  colors: Shades;
  colorsPerRow?: number;
  size?: number;
  sizeUnits?: SizeUnits;
} & PressableProps;

const ColorPalette = ({
  colors,
  colorsPerRow = 3,
  size = 30,
  sizeUnits = 'px',
  ...rest
}: Props) => {
  const ColorElements = colors.map(color => {
    return (
      <ColorElement
        key={color}
        size={size}
        color={color}
        sizeUnits={sizeUnits}
        {...rest}
      />
    );
  });

  return (
    <FloatingActionGroup quadrant={1}>{ColorElements}</FloatingActionGroup>
  );
};

const ColorElement = styled(Pressable)<{
  color: string;
  size: number;
  sizeUnits: SizeUnits;
}>`
  background-color: ${({ color }) => color};
  height: ${({ size, sizeUnits }) => `${size}${sizeUnits}`};
  width: ${({ size, sizeUnits }) => `${size}${sizeUnits}`};
  border-radius: ${({ size, sizeUnits }) => `${size}${sizeUnits}`};
  margin: 8px;
`;

export default ColorPalette;
