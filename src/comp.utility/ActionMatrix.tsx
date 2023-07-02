import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styled } from 'styled-components';
import { useTheme } from 'styled-components/native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../hooks/useRedux';

type Props = {};

const ActionMatrix = ({}: Props) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const mapColums;
  return <></>;
};

const MyStyledComponent = styled(TouchableOpacity)<{}>``;
const MyStyledComponent = styled(TouchableOpacity)``;

export default ActionMatrix;
