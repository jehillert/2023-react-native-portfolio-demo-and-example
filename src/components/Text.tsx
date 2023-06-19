import React from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

const BaseText = styled(RNText).attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const StyledBaseText = styled(BaseText)`
  letter-spacing: 0.15px;
  text-align-vertical: center;
`;

const AvatarInitials = styled(StyledBaseText)`
  font: normal normal 400 20px/20px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: 0.14px;
`;

const Body1 = styled(BaseText)`
  font: normal normal 400 16px/24px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: center;
`;

const Body2 = styled(BaseText)`
  font: normal normal 400 14px/20px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: center;
`;

const ButtonLarge = styled(StyledBaseText)`
  font: normal normal 500 18px/32px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: top;
  letter-spacing: 0.46px;
`;

const ButtonMedium = styled(StyledBaseText)`
  font: normal normal 500 16px/24px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: top;
  letter-spacing: 0.4px;
`;

const ButtonSmall = styled(StyledBaseText)`
  font: normal normal 500 14px/18px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: top;
  letter-spacing: 0.46px;
`;

const H1 = styled(StyledBaseText)`
  font: normal normal 500 96px/112.03px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: -1.5px;
`;

const H2 = styled(StyledBaseText)`
  font: normal normal 500 60px/72px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: -0.5px;
`;

const H3 = styled(StyledBaseText)`
  font: normal normal 500 48px/56px ${({ theme }) => theme.typography.fontFamily};
`;

const H4 = styled(StyledBaseText)`
  font: normal normal 500 34px/42px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: 0.25px;
`;

const H5 = styled(StyledBaseText)`
  font: normal normal 500 24px/32px ${({ theme }) => theme.typography.fontFamily};
`;

const H6 = styled(StyledBaseText)`
  font: normal normal bold 20px/32px ${({ theme }) => theme.typography.fontFamily};
`;

const InputLabel = styled(StyledBaseText)`
  font: normal normal 500 12px/12px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: center;
`;

const InputText = styled(StyledBaseText)`
  font: normal normal 400 16px/24px ${({ theme }) => theme.typography.fontFamily};
`;

const Overline = styled(StyledBaseText)`
  font: normal normal 400 12px/32px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: 1px;
`;

const Caption = styled(StyledBaseText)`
  font: normal normal 400 12px/20px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: 0.4px;
`;

const Tooltip = styled(StyledBaseText)`
  font: normal normal 500 10px/14px ${({ theme }) => theme.typography.fontFamily};
`;

const HelperText = styled(StyledBaseText)`
  font: normal normal 400 12px/20px ${({ theme }) => theme.typography.fontFamily};
  letter-spacing: 0.4px;
`;

const Subtitle1 = styled(StyledBaseText)`
  font: normal normal 500 16px/28px ${({ theme }) => theme.typography.fontFamily};
`;

const Subtitle2 = styled(StyledBaseText)`
  font: normal normal 500 14px/22px ${({ theme }) => theme.typography.fontFamily};
  text-align-vertical: top;
  letter-spacing: 0.1px;
`;

const Text = {
  AvatarInitials,
  Body1,
  Body2,
  ButtonLarge,
  ButtonMedium,
  ButtonSmall,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  InputLabel,
  InputText,
  Overline,
  Caption,
  Tooltip,
  HelperText,
  Subtitle1,
  Subtitle2,
};

export default Text;
