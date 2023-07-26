import React, { useState, ReactNode, PropsWithChildren } from 'react';
import {
  View,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { styled, useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { isAndroid } from '../constants';
import { TextPaper } from './TextPaper';
import { hScale } from '../theme/themeUtils';
import { useAppSelector } from '../hooks';
import { selectShowCardAccordions } from '../store/selectors';

type AccordionItemProps = {
  children: ReactNode;
  title: string;
  expanded: boolean;
  iconName?: string;
  onHeaderPress: () => void;
  iconColor?: string;
  styleBody?: StyleProp<ViewStyle>;
  styleHeader?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
};

type AccordionData = Omit<
  AccordionItemProps,
  'onHeaderPress' | 'expanded' | 'children'
> & {
  content: ReactNode;
};

type AccordionProps = PropsWithChildren<{
  data: AccordionData[];
}>;

if (isAndroid) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionContainer = styled(View)`
  padding-bottom: 4px;
`;

const AccordionBody = styled(View)``;

const AccordionHeader = styled(TouchableOpacity)`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const AccordionTitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  column-gap: ${hScale(8)}px;
`;

const AccordionTitleText = styled(TextPaper.TitleMedium)`
  color: ${({ theme }) => theme.colors.onSurface};
`;

const AccordionItem = ({
  children,
  iconName,
  iconColor,
  title,
  expanded,
  onHeaderPress,
  styleBody,
  styleHeader,
  styleTitle,
}: AccordionItemProps) => {
  const { colors, dimensions } = useTheme();
  const showCardAccordions = useAppSelector(selectShowCardAccordions);

  return showCardAccordions ? (
    <AccordionContainer>
      <AccordionHeader style={styleBody} onPress={onHeaderPress}>
        <AccordionTitleContainer>
          {!!iconName && (
            <Icon
              name={iconName}
              size={dimensions.iconSmall}
              color={iconColor ?? colors.onSurface}
            />
          )}
          <AccordionTitleText style={styleTitle}>{title}</AccordionTitleText>
        </AccordionTitleContainer>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={dimensions.iconLarge}
          color={colors.onSurface}
        />
      </AccordionHeader>
      {expanded && (
        <AccordionBody style={styleHeader}>{children}</AccordionBody>
      )}
    </AccordionContainer>
  ) : (
    children
  );
};

const Accordion = ({ data }: AccordionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleHeaderPress = (index: number) => () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return data.map((item, index) => (
    <AccordionItem
      key={index}
      iconName={item.iconName}
      title={item.title}
      expanded={expandedIndex === index}
      onHeaderPress={handleHeaderPress(index)}>
      {item.content}
    </AccordionItem>
  ));
};

export { Accordion, AccordionItem };
