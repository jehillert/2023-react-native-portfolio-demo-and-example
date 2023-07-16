import type { NativeStackScreenProps } from '@react-navigation/native-stack';

enum ScreensEnum {
  DIRECTORY = 'Directory',
  NOTE = 'Note',
  MARKUP = 'Markup',
  PRIVACY_POLICY = 'PrivacyPolicy',
  TERMS_OF_SERVICE = 'TermsofService',
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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type {
  MarkupScreenProps,
  RootStackParamList,
  DirectoryScreenProps,
  NoteScreenProps,
};

export { ScreensEnum };
