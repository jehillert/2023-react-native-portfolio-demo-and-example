import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleProp,
  ViewStyle,
  Pressable,
  PressableProps,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  name?: string;
  color?: string;
  onPress?: (() => void) | (() => Promise<void>);
  size?: number;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

const IconPressable = styled(Pressable)`
  margin-left: -8px;
`;

const BackButton = ({
  name = 'help-rhombus-outline',
  color,
  size = 32,
  onPress,
  style,
  ...props
}: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onPress) {
      onPress();
    } else {
      Keyboard.dismiss();
      navigation.goBack();
    }
  };

  return (
    <IconPressable {...props} style={style} onPress={handleBackPress}>
      <Icon
        name={name}
        size={size}
        color={color ? color : colors.textPrimary}
      />
    </IconPressable>
  );
};

export type { Props as IconButtonProps };

export default BackButton;
