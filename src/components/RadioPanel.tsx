import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { RadioButton, RadioButtonAndroidProps } from 'react-native-paper';
import { Controller, ControllerProps } from 'react-hook-form';

import Text from './Text';
import { VoidCallback } from '../types';

type RenderRadioButtons = {
  value: string;
  onChange: (value: string) => void;
};

type RadioControlRender = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
};

type RadioLayoutProps = {
  isTitle: boolean;
  labelPosition: 'left' | 'right';
};

const setRadioLayout = ({ isTitle, labelPosition }: RadioLayoutProps) => {
  if (labelPosition === 'right') {
    return `
        flex-direction: row-reverse;
        justify-content: flex-end;
        ${isTitle && `margin-right: 4px;`}
      `;
  } else {
    return `
        flex-direction: row;
        justify-content: space-between;
        ${isTitle && `margin: 0px 8px 0px 8px;`}
      `;
  }
};

const ButtonAndLabelView = styled(View)<{
  isTitle: boolean;
  labelPosition: 'left' | 'right';
}>`
  align-items: center;
  flex-wrap: nowrap;
  ${({ isTitle, labelPosition }) => setRadioLayout({ isTitle, labelPosition })}
`;

const Checkbox = styled(View)<{ checkmarkSize: number }>`
  align-items: center;
  justify-content: center;
  height: ${({ checkmarkSize }) => checkmarkSize + 6}px;
  width: ${({ checkmarkSize }) => checkmarkSize + 6}px;
  margin-right: 8px;
`;

const CheckmarkPressable = styled(Pressable)<{
  labelPosition: 'left' | 'right';
  isTitle: boolean;
}>`
  padding-vertical: 4px;
  align-items: center;
  flex-wrap: nowrap;
  ${({ isTitle, labelPosition }) => setRadioLayout({ isTitle, labelPosition })}
`;

const RadioPanelContainer = styled(View)``;

const RadioPanelLabel = styled(Text.Body1)<{ checkmarkSize: number }>``;

const TitleText = styled(Text.H6)`
  margin-bottom: 2px;
`;

type Props = {
  asForm?: boolean;
  controllerProps?: Omit<ControllerProps, 'render'>;
  labelPosition?: 'left' | 'right';
  labels: string[];
  setSelectedValue?: VoidCallback<any>;
  selectedValue?: string;
  style?: StyleProp<ViewStyle>;
  styleCheckbox?: StyleProp<ViewStyle>;
  styleRow?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleTitle?: StyleProp<TextStyle>;
  title?: string;
  variant?: 'check' | 'radio';
} & Partial<RadioButtonAndroidProps>;

const RadioPanel = ({
  asForm = false,
  labelPosition = 'right',
  title,
  labels,
  setSelectedValue,
  selectedValue = '',
  style,
  styleCheckbox,
  styleRow,
  styleText,
  styleTitle,
  variant = 'radio',
  controllerProps,
  ...radioButtonProps
}: Props) => {
  const { colors, dimensions } = useTheme();
  const checkmarkSize = dimensions.iconSmall;
  const isControlled = asForm && !!controllerProps;

  const renderPanel = ({ value, onChange }: RenderRadioButtons) => {
    const handlePress = (v: string) => () => onChange(v);

    return (
      <RadioPanelContainer style={style}>
        {labels.map(labelValue => {
          const status = value === labelValue ? 'checked' : 'unchecked';
          const checked = status === 'checked';

          const label = (
            <RadioPanelLabel style={styleText} checkmarkSize={checkmarkSize}>
              {labelValue}
            </RadioPanelLabel>
          );

          const radioButton = (
            <ButtonAndLabelView
              key={labelValue}
              labelPosition={labelPosition}
              isTitle={!!title}
              style={styleRow}>
              {label}
              <RadioButton.Android
                {...radioButtonProps}
                color={colors.primaryMain}
                uncheckedColor={colors.actionDisabled}
                value={labelValue}
                status={status}
                onPress={handlePress(labelValue)}
              />
            </ButtonAndLabelView>
          );

          const checkButton = (
            <CheckmarkPressable
              key={labelValue}
              isTitle={!!title}
              onPress={handlePress(labelValue)}
              labelPosition={labelPosition}
              style={styleRow}>
              {label}
              <Checkbox style={styleCheckbox} checkmarkSize={checkmarkSize}>
                {checked && (
                  <Icon
                    name="check-bold"
                    size={checkmarkSize}
                    color={colors.textPrimary}
                  />
                )}
              </Checkbox>
            </CheckmarkPressable>
          );

          return variant === 'radio' ? radioButton : checkButton;
        })}
      </RadioPanelContainer>
    );
  };
  return isControlled ? (
    <Controller
      {...controllerProps}
      render={({ field: { value, onChange } }: RadioControlRender) =>
        renderPanel({ value, onChange })
      }
    />
  ) : !!setSelectedValue ? (
    <>
      {!!title && <TitleText>{title}</TitleText>}
      {!!setSelectedValue &&
        renderPanel({
          value: selectedValue,
          onChange: setSelectedValue,
        })}
    </>
  ) : null;
};

export default RadioPanel;
