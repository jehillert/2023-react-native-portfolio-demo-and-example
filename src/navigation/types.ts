import type { NativeStackScreenProps } from '@react-navigation/native-stack';

enum Screens {
  DIRECTORY = 'Directory',
  NOTE = 'Note',
}

type CommonNavParams = { id?: string } | undefined;

type StackParamList = {
  [Screens.DIRECTORY]: CommonNavParams;
  [Screens.NOTE]: CommonNavParams;
};

type DirectoryScreenProps = NativeStackScreenProps<
  StackParamList,
  Screens.DIRECTORY
>;

type NoteScreenProps = NativeStackScreenProps<StackParamList, Screens.NOTE>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export type { StackParamList, DirectoryScreenProps, NoteScreenProps };

export { Screens };
