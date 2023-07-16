import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

const BaseText = styled(RNText).attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 400;
  letter-spacing: 0;
  text-align-vertical: center;
`;

const DisplayLarge = styled(BaseText)`
  line-height: 64px;
  font-size: 57px;
`;

const DisplayMedium = styled(BaseText)`
  line-height: 52px;
  font-size: 45px;
`;

const DisplaySmall = styled(BaseText)`
  line-height: 44px;
  font-size: 36px;
`;

const HeadlineLarge = styled(BaseText)`
  line-height: 40px;
  font-size: 32px;
`;

const HeadlineMedium = styled(BaseText)`
  line-height: 36px;
  font-size: 28px;
`;

const HeadlineSmall = styled(BaseText)`
  line-height: 32px;
  font-size: 24px;
`;

const TitleLarge = styled(BaseText)`
  line-height: 28px;
  font-size: 22px;
`;

const TitleMedium = styled(BaseText)`
  letter-spacing: 0.15px;
  font-weight: 500;
  line-height: 24px;
  font-size: 16px;
`;

const TitleSmall = styled(BaseText)`
  letter-spacing: 0.1px;
  font-weight: 500;
  line-height: 20px;
  font-size: 14px;
`;

const LabelLarge = styled(BaseText)`
  letter-spacing: 0.1px;
  font-weight: 500;
  line-height: 20px;
  font-size: 14px;
`;

const LabelMedium = styled(BaseText)`
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 16px;
  font-size: 12px;
`;

const LabelSmall = styled(BaseText)`
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 16px;
  font-size: 11px;
`;

const BodyLarge = styled(BaseText)`
  letter-spacing: 0.15px;
  line-height: 24px;
  font-size: 16px;
`;

const BodyMedium = styled(BaseText)`
  letter-spacing: 0.25px;
  line-height: 20px;
  font-size: 14px;
`;

const BodySmall = styled(BaseText)`
  letter-spacing: 0.4px;
  line-height: 16px;
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
