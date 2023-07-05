import type { NativeStackScreenProps } from '@react-navigation/native-stack';

enum ScreensEnum {
  DIRECTORY = 'Directory',
  NOTE = 'Note',
}

type CommonNavParams = { id?: string } | undefined;

type StackParamList = {
  [ScreensEnum.DIRECTORY]: CommonNavParams;
  [ScreensEnum.NOTE]: CommonNavParams;
};

type DirectoryScreenProps = NativeStackScreenProps<
  StackParamList,
  ScreensEnum.DIRECTORY
>;

type NoteScreenProps = NativeStackScreenProps<StackParamList, ScreensEnum.NOTE>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export type { StackParamList, DirectoryScreenProps, NoteScreenProps };

export { ScreensEnum };
