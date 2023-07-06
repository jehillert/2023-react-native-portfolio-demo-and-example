import React from 'react';
import { View } from 'react-native';
import { styled } from 'styled-components';
import { useTheme } from 'styled-components/native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { MarkupScreenProps } from '../../navigation';
import { useAppDispatch } from '../../hooks/useRedux';

type Props = {} & MarkupScreenProps;

const MarkupScreen = ({}: Props) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return <MarkupScreenContainer></MarkupScreenContainer>;
};

const MarkupScreenContainer = styled(View)<{}>`
  background-color: tan;
`;

export default MarkupScreen;
