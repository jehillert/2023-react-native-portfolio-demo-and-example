import React from 'react';
import { View } from 'react-native';
import { styled } from 'styled-components/native';

import { selectActiveWebpage } from '../../store/selectors';
import { IconPressable } from '../../components';
import { useAppSelector } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { TextPaper } from '../../components/TextPaper';
import { windowWidth } from '../../constants';

const HeaderContainer = styled(View)`
  flex-direction: row;
  flex-wrap: nowrap;
  width: ${windowWidth * 0.75}px;
  align-items: center;
`;

const HeaderTitle = styled(TextPaper.TitleMedium)`
  flex: 1;
`;

const TitledBackButton = () => {
  const navigation = useNavigation();
  const activeNote = useAppSelector(selectActiveWebpage);
  const noteTitle = activeNote?.title ?? '';

  const handlePress = () => navigation.goBack();

  return (
    <HeaderContainer>
      <IconPressable name="chevron-left" onPress={handlePress} />
      <HeaderTitle ellipsizeMode="tail" numberOfLines={1}>
        {noteTitle}
      </HeaderTitle>
    </HeaderContainer>
  );
};

export default TitledBackButton;
