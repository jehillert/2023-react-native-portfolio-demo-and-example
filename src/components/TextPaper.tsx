import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

const BaseText = styled(RNText).attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: sans-serif;
  font-weight: 400;
  letter-spacing: 0;
  text-align-vertical: center;
`;

const DisplayLarge = styled(BaseText)`
  line-height: 64;
  font-size: 57px;
`;

const DisplayMedium = styled(BaseText)`
  line-height: 52;
  font-size: 45px;
`;

const DisplaySmall = styled(BaseText)`
  line-height: 44;
  font-size: 36px;
`;

const HeadlineLarge = styled(BaseText)`
  line-height: 40;
  font-size: 32px;
`;

const HeadlineMedium = styled(BaseText)`
  line-height: 36;
  font-size: 28px;
`;

const HeadlineSmall = styled(BaseText)`
  line-height: 32;
  font-size: 24px;
`;

const TitleLarge = styled(BaseText)`
  line-height: 28;
  font-size: 22px;
`;

const TitleMedium = styled(BaseText)`
  font-family: sans-serif-medium;
  letter-spacing: 0.15px;
  font-weight: 500;
  line-height: 24;
  font-size: 16px;
`;

const TitleSmall = styled(BaseText)`
  font-family: sans-serif-medium;
  letter-spacing: 0.1px;
  font-weight: 500;
  line-height: 20;
  font-size: 14px;
`;

const LabelLarge = styled(BaseText)`
  font-family: sans-serif-medium;
  letter-spacing: 0.1px;
  font-weight: 500;
  line-height: 20;
  font-size: 14px;
`;

const LabelMedium = styled(BaseText)`
  font-family: sans-serif-medium;
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 16;
  font-size: 12px;
`;

const LabelSmall = styled(BaseText)`
  font-family: sans-serif-medium;
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 16;
  font-size: 11px;
`;

const BodyLarge = styled(BaseText)`
  letter-spacing: 0.15px;
  line-height: 24;
  font-size: 16px;
`;

const BodyMedium = styled(BaseText)`
  letter-spacing: 0.25px;
  line-height: 20;
  font-size: 14px;
`;

const BodySmall = styled(BaseText)`
  letter-spacing: 0.4px;
  line-height: 16;
  font-size: 12px;
`;

const Text = {
  Default: BaseText,
  BodyLarge,
  BodyMedium,
  BodySmall,
  DisplayLarge,
  DisplayMedium,
  DisplaySmall,
  HeadlineLarge,
  HeadlineMedium,
  HeadlineSmall,
  LabelLarge,
  LabelMedium,
  LabelSmall,
  TitleLarge,
  TitleMedium,
  TitleSmall,
};

export default Text;
