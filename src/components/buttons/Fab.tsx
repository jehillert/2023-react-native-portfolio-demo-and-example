import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import { SvgProps } from 'react-native-svg';
import { Positioner, PositionerProps } from '../utility';

type SvgFabProps = {
  SvgIcon: React.FC<SvgProps>;
  iconProps?: SvgProps;
  iconStyle?: StyleProp<ViewStyle>;
  positioning: PositionerProps;
} & PressableProps;

const SvgFab = ({
  SvgIcon,
  iconProps,
  positioning,
  ...pressableProps
}: SvgFabProps) => {
  return (
    <Positioner {...positioning}>
      <Pressable {...pressableProps}>
        <SvgIcon {...iconProps} />
      </Pressable>
    </Positioner>
  );
};

type FabProps = {
  iconProps: IconProps;
  positioning: PositionerProps;
} & PressableProps;

const Fab = ({ iconProps, positioning, ...pressableProps }: FabProps) => {
  return (
    <Positioner {...positioning}>
      <Pressable {...pressableProps}>
        <Icon {...iconProps} />
      </Pressable>
    </Positioner>
  );
};

export { Fab, SvgFab };
