import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Positioner, PositionerProps } from '../utility';
import { PaletteColorProp } from '../../constants';
import Text from '../Text';

type ColorCallback = (props: { bg: string; fg?: string }) => void;

type Props = {
  colors: PaletteColorProp[];
  onPressColor: ColorCallback;
  row?: boolean;
  size?: number;
  positioning: PositionerProps;
  textStyle?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

const ColorPalette = ({
  colors,
  onPressColor,
  positioning,
  row = false,
  size = 30,
  textStyle,
  ...rest
}: Props) => {
  const ColorElements = colors.map(color => {
    const { bg, fg, txt } = color;
    const isText = !!txt;
    const _fg = isText && !fg ? 'transparent' : fg ? fg : undefined;
    const id = isText ? `${bg}-${fg}-${txt}` : `${bg}-${fg}`;

    const handlePress = () =>
      isText ? onPressColor({ bg, fg }) : onPressColor({ bg });

    return (
      <ColorElement
        key={id}
        id={id}
        size={size}
        bg={bg}
        fg={_fg}
        onPress={handlePress}
        {...rest}>
        <ColorText fg={_fg} style={textStyle}>
          {txt}
        </ColorText>
      </ColorElement>
    );
  });

  return (
    <Positioner quadrant={1} {...positioning}>
      <PaletteView row={row}>{ColorElements}</PaletteView>
    </Positioner>
  );
};

const ColorElement = styled(TouchableOpacity)<{
  bg: string;
  fg?: string;
  size: number;
}>`
  margin: 8px;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size}px`};
  background-color: ${({ bg }) => bg};
`;

const PaletteView = styled(View)<{ row: boolean }>`
  flex-flow: ${({ row }) => (row ? `row` : `column`)} nowrap;
`;

const ColorText = styled(Text.Body1)<{ fg: string }>`
  color: ${({ fg }) => fg};
`;

export type { ColorCallback, Props as ColorPaletteProps };
export default ColorPalette;
