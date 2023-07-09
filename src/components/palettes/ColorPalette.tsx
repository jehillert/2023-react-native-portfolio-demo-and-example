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

type ColorCallback = (props: {
  backgroundColor: string;
  color?: string;
}) => void;

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
  backgroundColor: string;
  color?: string;
  size: number;
}>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

const PaletteView = styled(View)<{ row: boolean }>`
  flex-flow: ${({ row }) => (row ? `row` : `column`)} nowrap;
`;

const ColorText = styled(Text.AvatarInitials)<{ color?: string }>`
  color: ${({ color, theme }) => color ?? theme.colors.textPrimary};
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
  const ColorElements = colors.map(paletteColor => {
    const { backgroundColor, color, txt } = paletteColor;
    const isText = !!txt;
    const _color = isText && !color ? 'transparent' : color ? color : undefined;
    const id = isText
      ? `${backgroundColor}-${color}-${txt}`
      : `${backgroundColor}-${color}`;

    const handlePress = () =>
      isText
        ? onPressColor({ backgroundColor, color })
        : onPressColor({ backgroundColor });

    return (
      <Surface key={id} style={style} size={size} mode="elevated" elevation={3}>
        <ColorElement
          id={id}
          size={size}
          backgroundColor={backgroundColor}
          color={_color}
          onPress={handlePress}
          {...rest}>
          {isText && (
            <ColorText color={_color} style={textStyle}>
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
