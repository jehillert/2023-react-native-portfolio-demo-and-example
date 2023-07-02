import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';

import { FloatingActionGroup, FloatingActionGroupProps } from '../comp.utility';

import { SvgProps } from 'react-native-svg';

type Props = {
  Icon: React.FC<SvgProps>;
  iconProps?: SvgProps;
  iconStyle?: StyleProp<ViewStyle>;
} & FloatingActionGroupProps;

const Fab = ({ Icon, iconProps, ...rest }: Props) => {
  const theme = useTheme();
  const shadowStyles = theme.shadow.fab;
  return (
    <FloatingActionGroup style={shadowStyles} {...rest}>
      <Icon style={shadowStyles} {...iconProps} />
    </FloatingActionGroup>
  );
};

export default Fab;
