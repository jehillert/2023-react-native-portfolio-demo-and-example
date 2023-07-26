import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styled } from 'styled-components/native';

const DividerView = styled(View)<{ marginVertical: number }>`
  width: 100%;
  height: 2px;
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
  background-color: ${({ theme }) => theme.colors.outlineVariant};
`;

type Props = {
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
};

const Divider = ({ style, marginVertical = 8 }: Props) => {
  return <DividerView marginVertical={marginVertical} style={style} />;
};

export default Divider;
