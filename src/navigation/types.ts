import type { NativeStackScreenProps } from '@react-navigation/native-stack';

enum ScreensEnum {
  DIRECTORY = 'Directory',
  NOTE = 'Note',
  MARKUP = 'Markup',
}

type CommonNavParams = { id?: string } | undefined;

type RootStackParamList = {
  [ScreensEnum.DIRECTORY]: CommonNavParams;
  [ScreensEnum.NOTE]: CommonNavParams;
  [ScreensEnum.MARKUP]: CommonNavParams;
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
  ScreensEnum.NOTE
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
