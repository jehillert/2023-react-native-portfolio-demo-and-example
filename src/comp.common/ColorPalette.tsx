import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { Shades, Highlights } from '../constants';
import { ActionMatrix } from '../comp.utility';
import Text from './Text';

type Props = {
  colors: Shades | Highlights;
  nodesPerRow?: number;
  sizeAsPercentOfAxis?: number;
  axis?: 'horizontal' | 'vertical';
} & PressableProps;

const ColorPalette = ({
  colors,
  nodesPerRow = 3,
  sizeAsPercentOfAxis = 30,
  axis = 'horizontal',
  ...rest
}: Props) => {
  const ColorElements = colors.map(color => {
    const isHighlight = Array.isArray(color);
    const fg = `
      color: ${color[1]};
    `;

    const bg = `
      background-color: ${color[0]};
      height: ${sizeAsPercentOfAxis}%;
      width: ${sizeAsPercentOfAxis}%;
    `;

    return isHighlight ? (
      <Pressable key={color[0]} css={bg} {...rest}>
        <Text.ButtonSmall css={fg}>a</Text.ButtonSmall>
      </Pressable>
    ) : (
      <Pressable key={color} {...rest} />
    );
  });

  return (
    <ActionMatrix
      axis={axis}
      elements={ColorElements}
      nodesPerRow={nodesPerRow}
      sizeAsPercentOfAxis={sizeAsPercentOfAxis}
    />
  );
};

export default ColorPalette;
