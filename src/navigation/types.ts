import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

enum Screens {
  DIRECTORY = 'Directory',
  HOME = 'Home',
  MARKUP = 'Markup',
  NOTE = 'Note',
}

type CommonNavParams = { id?: string } | undefined;

type DrawerParamList = {
  [Screens.DIRECTORY]: CommonNavParams;
  [Screens.HOME]: undefined;
  [Screens.NOTE]: { activeNoteId: string } & CommonNavParams;
  [Screens.MARKUP]: CommonNavParams;
};

type StackParamList = {
  [Screens.DIRECTORY]: CommonNavParams;
  [Screens.NOTE]: CommonNavParams;
  [Screens.MARKUP]: CommonNavParams;
};

type DrawerNavScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;

type DirectoryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, Screens.DIRECTORY>,
  DrawerNavScreenProps<Screens.DIRECTORY>
>;

type NoteScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, Screens.NOTE>,
  DrawerNavScreenProps<Screens.NOTE>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}

export type {
  DrawerParamList,
  StackParamList,
  DrawerNavScreenProps,
  DirectoryScreenProps,
  NoteScreenProps,
};

export { Screens };
