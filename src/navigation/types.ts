import type { NativeStackScreenProps } from '@react-navigation/native-stack';

enum ScreensEnum {
  DIRECTORY = 'Directory',
  NOTE = 'Note',
  MARKUP = 'Markup',
  PRIVACY_POLICY = 'Privacy Policy',
  TERMS_OF_SERVICE = 'Terms of Service',
}

type CommonNavParams = { id?: string } | undefined;

type RootStackParamList = {
  [ScreensEnum.DIRECTORY]: CommonNavParams;
  [ScreensEnum.NOTE]: CommonNavParams;
  [ScreensEnum.MARKUP]: CommonNavParams;
  [ScreensEnum.PRIVACY_POLICY]: undefined;
  [ScreensEnum.TERMS_OF_SERVICE]: undefined;
};

type DirectoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensEnum.DIRECTORY
>;

type NoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensEnum.NOTE
>;

type MarkupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensEnum.MARKUP
>;

type PrivacyPolicyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensEnum.PRIVACY_POLICY
>;

type TermsOfServiceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensEnum.TERMS_OF_SERVICE
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type {
  DirectoryScreenProps,
  MarkupScreenProps,
  NoteScreenProps,
  PrivacyPolicyScreenProps,
  RootStackParamList,
  TermsOfServiceScreenProps,
};

export { ScreensEnum };
