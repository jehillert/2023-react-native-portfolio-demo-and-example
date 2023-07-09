import React from 'react';
import styled from 'styled-components/native';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { Positioner, PositionerProps } from '../utility';
import { PaletteColorProp } from '../../constants';
import Text from '../Text';
import { Surface as BaseSurface } from 'react-native-paper';

type ColorCallback = (props: { bg: string; fg?: string }) => void;

type Props = {
  colors: PaletteColorProp[];
  onPressColor: ColorCallback;
  row?: boolean;
  size?: number;
  positioning: PositionerProps;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

const ColorElement = styled(TouchableOpacity)<{
  bg: string;
  fg?: string;
  size: number;
}>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size}px`};
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
`;

const PaletteView = styled(View)<{ row: boolean }>`
  flex-flow: ${({ row }) => (row ? `row` : `column`)} nowrap;
`;

const ColorText = styled(Text.AvatarInitials)<{ fg?: string }>`
  color: ${({ fg, theme }) => fg ?? theme.colors.textPrimary};
`;

const Surface = styled(BaseSurface)<{ size: number }>`
  border-radius: ${({ size }) => size}px;
  margin: 8px;
`;

const ColorPalette = ({
  colors,
  onPressColor,
  positioning,
  row = false,
  size = 30,
  style,
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
      <Surface key={id} style={style} size={size} mode="elevated" elevation={3}>
        <ColorElement
          id={id}
          size={size}
          bg={bg}
          fg={_fg}
          onPress={handlePress}
          {...rest}>
          {isText && (
            <ColorText fg={_fg} style={textStyle}>
              {txt}
            </ColorText>
          )}
        </ColorElement>
      </Surface>
    );
  });

  return (
    <Positioner quadrant={1} {...positioning}>
      <PaletteView row={row}>{ColorElements}</PaletteView>
    </Positioner>
  );
};

export type { ColorCallback, Props as ColorPaletteProps };
export default ColorPalette;
