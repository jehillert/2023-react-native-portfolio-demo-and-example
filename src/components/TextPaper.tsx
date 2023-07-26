import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

const BaseText = styled(RNText).attrs({
  allowFontScaling: false,
})`
  color: ${({ theme }) => theme.colors.onPrimary};
  font-family: ${({ theme }) => theme.baseTypography.fontFamily};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align-vertical: center;
  letter-spacing: 0px;
`;

const BodyLarge = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.bodyLarge.lineHeight};
  font-size: ${({ theme }) => theme.typography.bodyLarge.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.bodyLarge.letterSpacing};
`;

const BodyMedium = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
  font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.bodyMedium.letterSpacing};
`;

const BodySmall = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.bodySmall.lineHeight};
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.bodySmall.letterSpacing};
`;

const DisplayLarge = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.displayLarge.lineHeight};
  font-size: ${({ theme }) => theme.typography.displayLarge.fontSize};
`;

const DisplayMedium = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.displayMedium.lineHeight};
  font-size: ${({ theme }) => theme.typography.displayMedium.fontSize};
`;

const DisplaySmall = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.displaySmall.lineHeight};
  font-size: ${({ theme }) => theme.typography.displaySmall.fontSize};
`;

const HeadlineLarge = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.headlineLarge.lineHeight};
  font-size: ${({ theme }) => theme.typography.headlineLarge.fontSize};
`;

const HeadlineMedium = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.headlineMedium.lineHeight};
  font-size: ${({ theme }) => theme.typography.headlineMedium.fontSize};
`;

const HeadlineSmall = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.headlineSmall.lineHeight};
  font-size: ${({ theme }) => theme.typography.headlineSmall.fontSize};
`;

const LabelLarge = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.labelLarge.lineHeight};
  font-size: ${({ theme }) => theme.typography.labelLarge.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.labelLarge.letterSpacing};
  font-weight: ${({ theme }) => theme.typography.labelLarge.fontWeight};
`;

const LabelMedium = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.labelMedium.lineHeight};
  font-size: ${({ theme }) => theme.typography.labelMedium.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.labelMedium.letterSpacing};
  font-weight: ${({ theme }) => theme.typography.labelMedium.fontWeight};
`;

const LabelSmall = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.labelSmall.lineHeight};
  font-size: ${({ theme }) => theme.typography.labelSmall.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.labelSmall.letterSpacing};
  font-weight: ${({ theme }) => theme.typography.labelSmall.fontWeight};
`;

const TitleLarge = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.titleLarge.lineHeight};
  font-size: ${({ theme }) => theme.typography.titleLarge.fontSize};
`;

const TitleMedium = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.titleMedium.lineHeight};
  font-size: ${({ theme }) => theme.typography.titleMedium.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.titleMedium.letterSpacing};
  font-weight: ${({ theme }) => theme.typography.titleMedium.fontWeight};
`;

const TitleSmall = styled(BaseText)`
  line-height: ${({ theme }) => theme.typography.titleSmall.lineHeight};
  font-size: ${({ theme }) => theme.typography.titleSmall.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.titleSmall.letterSpacing};
  font-weight: ${({ theme }) => theme.typography.titleSmall.fontWeight};
`;

const TextPaper = {
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

export { TextPaper };
