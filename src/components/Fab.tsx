import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Positioner, PositionerProps } from './utility';
import { IconProps } from 'react-native-vector-icons/Icon';

type Props = {
  Icon: React.FC<SvgProps | IconProps>;
  iconProps?: SvgProps;
  iconStyle?: StyleProp<ViewStyle>;
  positioning: PositionerProps;
} & PressableProps;

const Fab = ({ Icon, iconProps, positioning, ...rest }: Props) => {
  return (
    <Positioner {...positioning}>
      <Pressable {...rest}>
        <Icon {...iconProps} />
      </Pressable>
    </Positioner>
  );
};

export default Fab;
